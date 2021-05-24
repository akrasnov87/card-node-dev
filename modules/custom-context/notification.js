/**
 * @file modules/custom-context/notification.js
 * @project node-service
 * @author Александр
 */

/**
 * объект для формирования ответа
 */
var result_layout = require('mobnius-pg-dbcontext/modules/result-layout');
var db = require('../dbcontext');

/**
 * Объект с набором RPC функций
 */
exports.notification = function (session) {

    return {
        isLocal: true, // нужно указывать, иначе безопасность при создании meta не пропустит

        /**
         * получение списка уведомлений для пользователя
         * @param {*} data 
         * @param {*} callback
         * @example
         * [{ action: "notification", method: "getUserNotifications", data: [{ }], type: "rpc", tid: 0 }]
         */
        getUserNotifications: function (data, callback) {
            if (session.isAuthorize == true) {
                db.cd_notifications().Count({
                    filter: [{
                        property: 'fn_user_to',
                        value: session.user.id
                    }, {
                        property: 'b_sended',
                        value: false
                    }]
                }, function (result) {
                    if (result.meta.success == true) {
                        callback(result_layout.ok([{"n_count": parseInt(result.result.total)}]));
                    } else {
                        callback(result_layout.error(new Error(result.meta.msg)));
                    }
                })
            } else {
                callback(result_layout.error(new Error('Получение списка уведомлений по не авторизованному пользователю.')));
            }
        },

        /**
         * изменения статуса уведомления
         * @param {*} data 
         * @param {*} callback 
         * @example
         * [{ action: "notification", method: "changeStatus", data: [{ "params": [{ "selection": ["1"] }] }], type: "rpc", tid: 0 }]
         * , где selection - идентификатор уведомления
         */
        changeStatus: function (data, callback) {
            if (session.isAuthorize == true) {
                var params = [];
                var queryPart = '(';
                try {
                    var array = data.params[0].selection;
                    for (var i = 0; i < array.length; i++) {
                        params.push(array[i]);
                        queryPart += ('$' + (i + 1) + ',');
                    }
                    queryPart = queryPart.substr(0, queryPart.length - 1) + ')';
                } catch (err) {
                    return callback(result_layout.error(new Error('Идентификатор сообщения не передан. ' + err.toString())));
                }
                params.push(session.user.id);
                db.provider.db().query('update core.cd_notifications set b_readed = true where id in ' + queryPart + ' and fn_user_to = $' + (array.length + 1), params, function (err, rows) {
                    if (!err) {
                        callback(result_layout.ok([]));
                    } else {
                        callback(result_layout.error(new Error(err.toString())));
                    }
                });
            } else {
                callback(result_layout.error(new Error('Изменение статуса уведомления не авторизованным пользователем.')));
            }
        },
        /**
         * изменения статуса всех уведомлений
         * @param {*} data 
         * @param {*} callback 
         * @example
         * [{ action: "notification", method: "changeStatusAll", data: [{ }], type: "rpc", tid: 0 }]
         */
        changeStatusAll: function (data, callback) {
            if (session.isAuthorize == true) {
                db.provider.db().query('update core.cd_notifications set b_sended = true, b_readed = true where fn_user_to = $1 and (b_sended = false or b_readed = false);', [session.user.id], function (err, rows, time, options) {
                    if (err) {
                        callback(result_layout.error(err));
                    } else {
                        callback(result_layout.ok([]));
                    }
                });
            } else {
                callback(result_layout.error(new Error('Изменение статуса уведомлений не авторизованным пользователем.')));
            }
        },

        /**
         * отметка о том, что уведомления были доставлены, но не прочитаны пользователем
         * @param {*} data 
         * @param {*} callback
         * @example
         * [{ action: "notification", method: "sended", data: [{ }], type: "rpc", tid: 0 }]
         */
        sended: function (data, callback) {
            if (session.isAuthorize == true) {
                db.provider.db().query('update core.cd_notifications set b_sended = true where fn_user_to = $1 and b_sended = false;', [session.user.id], function (err, rows, time, options) {
                    if (err) {
                        callback(result_layout.error(err));
                    } else {
                        callback(result_layout.ok([]));
                    }
                });
            } else {
                callback(result_layout.error(new Error('Получение списка уведомлений по не авторизованному пользователю.')));
            }
        }
    }
}