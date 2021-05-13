/**
 * @file modules/file-context.js
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
 * утилиты
 */
exports.files = function (session) {
    var userId = session.user.c_login;
    var socketLog = socketUtils.log(session.request.socket, session.request.tid);
    var writeFile = utils.writeFile(session);

    var self = {
        isLocal: true, // нужно указывать, иначе безопасность при создании meta не пропустит

        Select: function (query_param, callback) {
            dbcontext.provider.select('core', 'cf_mui_cd_files()', query_param, filter.security(session), function (args) {
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
            dbcontext.provider.exists('core', 'cd_files', 'id', data, function (result) {
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
                    var file = reader.getFile(item.c_name);
                    if (file) {
                        item.ba_data = file.buffer;
                        item.n_size = file.buffer.byteLength;
                        dbcontext.provider.insert('core', 'cd_files', item, function (args) {
                            // нужно отправлять только те файлы которые были обработаны.
                            if (!args.meta.success) {
                                var msg = "Ошибка сохранения файла " + item.c_name + " " + args.meta.msg;
                                return callback(result_layout.error(new Error(msg)));
                            }
                            delete item.ba_data;
                            //socketLog.log('Файл ' + item.c_name + ' сохранен.');
                            results.push(item);
                            next();
                        });
                    } else {
                        var msg = "Для вложения " + item.c_name + " не найдено файла.";
                        return callback(result_layout.error(new Error(msg)));
                    }
                } else {
                    logjs.debug('Добавлено ' + totalCount + ' файлов для пользователя ' + userId + ' за ' + ((Date.now() - dt) / 1000) + ' секунд.');
                    callback(result_layout.ok(results));
                }
            }

            next();
        },
        Update: function (data, callback) {
            dbcontext.provider.update('core', 'cd_files', 'id', data, function (results) {
                results.result.records = [];
                callback(results);
            });
        },
        Query: function (query_param, callback) {
            dbcontext.provider.select('core', 'cd_files', query_param, filter.security(session), function (args) {
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
        Delete: function (data, callback) {
            dbcontext.provider.delete('core', 'cd_files', 'id', data, function (args) {
                function next() {
                    var item = data[0];
                    if (item) {
                        data.shift();

                        var message = 'Файл ' + item.id + ' успешно удален.';
                        logjs.debug(message);
                        socketLog.log(message);

                        next();
                    } else {
                        callback(result_layout.ok([]));
                    }
                }
                if (args.meta.success) {
                    next();
                } else {
                    return callback(result_layout.error(new Error(args.meta.msg)));
                }
            });
        },
        Count: function (query_param, callback) {
            dbcontext.provider.count('core', 'cd_files', query_param, callback);
        }
    };

    return self;
}