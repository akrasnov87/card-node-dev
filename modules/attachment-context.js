/**
 * @file modules/attachment-context.js
 * @project node-service
 * @author Александр
 */

/**
 * объект для формирования ответа
 */
var result_layout = require('mobnius-pg-dbcontext/modules/result-layout');
var socketUtils = require('./socket/utils');
var utils = require('./utils');
/**
 * провайдер по обработке данных
 */
var dbcontext = require('./dbcontext');
var filter = require('./rpc/modules/access-filter');
var convert = require('./convert');

var logjs = require('./log');

/**
 * обработка вложений у точки маршрута
 * @param {any} session сессия
 */
exports.attachments = function (session) {
    var userId = session.user.c_login;
    var socketLog = socketUtils.log(session.request.socket, session.request.tid);
    var writeFile = utils.writeFile(session);

    var self = {
        isLocal: true, // нужно указывать, иначе безопасность при создании meta не пропустит

        Select: function (query_param, callback) {
            dbcontext.provider.select('core', 'cf_mui_cd_attachments()', query_param, filter.security(session), function (args) {
                var results = [];

                if (args.meta.success) {
                    var items = args.result.records;
                    var progressFile = utils.progressFile(socketLog, items.length);
                    progressFile.init(args.time);

                    function next() {
                        var item = items[0];
                        if (item) {
                            items.shift();
                            progressFile.beforeNext();
                            var insertResult = convert.toMobileAttachment(item);
                            if (item.ba_data) {
                                progressFile.next('получен');
                                writeFile.toResponce(item.id, item.c_name, item.ba_data);
                                results.push(insertResult);
                                next();
                            } else {
                                progressFile.next('получен оригинальный');
                                writeFile.toResponce(item.id, item.c_name, item.ba_file);
                                results.push(insertResult);
                                next();
                            }
                        } else {
                            progressFile.finish('Для пользователя ' + userId + ' было обработано ' + progressFile.getTotalCount() + ' файлов за ' + progressFile.getTime() + ' секунд.');
                            callback(result_layout.ok(results));
                        }
                    }
                    next();
                } else {
                    callback(result_layout.error(new Error(socketLog.error('Ошибка при выборке файлов. ' + args.meta.msg))));
                }
            });
        },
        AddOrUpdate: function (data, callback) {
            dbcontext.provider.exists('core', 'cd_attachments', 'id', data, function (result) {
                if (result.meta.success) {
                    if (result.result.records[0] == true) {
                        self.Update(data, callback);
                    } else {
                        self.Add(data, callback);
                    }
                } else {
                    callback(result_layout.error(new Error(result.meta.msg)));
                }
            });
        },
        Add: function (data, callback) {
            var items = data.slice(0);
            var reader = utils.fileReader(session);

            var results = [];

            var dt = Date.now();
            var totalCount = items.length;

            function next() {
                var item = items[0];
                if (item) {
                    items.shift();
                    var file = reader.getFileByKey(item.id);
                    if (file) {
                        item.ba_data = file.buffer;
                        item.n_size = file.buffer.byteLength;
                        dbcontext.provider.insert('core', 'cd_attachments', item, function (args) {
                            // нужно отправлять только те файлы которые были обработаны.
                            if (!args.meta.success) {
                                var msg = "Ошибка сохранения файла " + item.c_name + " " + args.meta.msg;
                                return callback(result_layout.error(new Error(msg)));
                            }
                            //socketLog.log('Файл вложение ' + item.id + ' сохранен.');
                            delete item.ba_data;
                            results.push(item);
                            next();
                        });
                    } else {
                        dbcontext.provider.insert('core', 'cd_attachments', data, next);
                    }
                } else {
                    logjs.debug('Добавлено ' + totalCount + ' файлов для пользователя ' + userId + ' за ' + ((Date.now() - dt) / 1000) + ' секунд.');
                    callback(result_layout.ok(results));
                }
            }

            next();
        },
        Update: function (data, callback) {
            dbcontext.provider.update('core', 'cd_attachments', 'id', data, function (results) {
                results.result.records = [];
                callback(results);
            });
        },
        Query: function (query_param, callback) {
            dbcontext.provider.select('core', 'cd_attachments', query_param, filter.security(session), function (args) {
                var results = [];

                if (args.meta.success) {
                    var items = args.result.records;
                    var progressFile = utils.progressFile(socketLog, items.length);
                    progressFile.init(args.time);

                    function next() {
                        var item = items[0];
                        if (item) {
                            items.shift();
                            progressFile.beforeNext();
                            var insertResult = convert.toMobileFile(item);
                            writeFile.toResponce(item.id, item.c_name, item.ba_data);
                            results.push(insertResult);
                            next();
                        } else {
                            progressFile.finish('Для пользователя ' + userId + ' было обработано ' + progressFile.getTotalCount() + ' вложений за ' + progressFile.getTime() + ' секунд.');
                            callback(result_layout.ok(results));
                        }
                    }
                    next();
                } else {
                    callback(result_layout.error(new Error(socketLog.error('Ошибка при выборке вложений. ' + args.meta.msg))));
                }
            });
        }
    };

    return self;
}