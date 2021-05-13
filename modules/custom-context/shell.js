/**
 * @file modules/custom-context/shell.js
 * @project node-service
 * @author Александр
 */

/**
 * объект для формирования ответа
 */
var result_layout = require('mobnius-pg-dbcontext/modules/result-layout');
var authorizeDb = require('../authorize/authorization-db');
var saltHash = require('../authorize/saltHash');
var db = require('../dbcontext');

/**
 * Объект с набором RPC функций
 */
exports.shell = function (session) {

    return {
        isLocal: true, // нужно указывать, иначе безопасность при создании meta не пропустит

        /**
         * Получение серверного времени
         * @param {*} data 
         * @param {*} callback 
         * @example
         * [{ action: "shell", method: "getServerTime", data: [{ }], type: "rpc", tid: 0 }]
         */
        getServerTime: function (data, callback) {
            callback(result_layout.ok([new Date()]));
        },
        /**
         * Удаление пользователя
         * @param {*} data 
         * @param {*} callback 
         * @example
         * [{ action: "shell", method: "getServerTime", data: [{ "params": [{ "selection": ["1"] }] }], type: "rpc", tid: 0 }]
         */
        removeUser: function (data, callback) {
            var userid = null;
            try {
                userid = parseInt(data.params[0].selection[0]);
            } catch (exc) {

            }
            if (userid) {
                authorizeDb.removeUser(userid, function (err) {
                    if (err) {
                        callback(result_layout.error(err));
                    } else {
                        callback(result_layout.ok([]));
                    }
                });
            } else {
                callback(result_layout.error(new Error('Идентификатор пользователя не найден')));
            }
        },

        /**
         * Изменение пароля пользователя
         * @param {any} data данные
         * @param {*} callback 
         * @example
         * [{ action: "shell", method: "saltHash", data: [{ "params": [{ "password": "", "selection": ["1"] }] }], type: "rpc", tid: 0 }]
         * ,где password - новый пароль, selection - идентификатор пользователя
         */
        saltHash: function (data, callback) {
            var params = data.params[0];
            if (!params) {
                return callback(result_layout.error(new Error('Параметры не найдены.')));
            }

            var password = params.password;
            if (!password)
                return callback(result_layout.error(new Error('Пароль не найден.')));
            var id = null;
            try {
                id = parseInt(params.selection[0]);
            } catch (exc) {
                return callback(result_layout.error(new Error('Идентификатор пользователя не найден.')));
            }
            try {
                db.pd_users().Query({
                    filter: [{
                        property: 'id',
                        value: id
                    }]
                }, function (data) {
                    if (data.result.records.length == 0) {
                        return callback(result_layout.error(new Error('Пользователь с идентификаторм ' + id + ' не найден.')));
                    } else {
                        var record = data.result.records[0];
                        record.c_password = null;
                        var obj = saltHash.generate(password);
                        record.c_password = '';
                        record.s_salt = obj.salt;
                        record.s_hash = obj.passwordHash;

                        db.pd_users().Update(record, function (data) {
                            if (data.meta.success == false) {
                                callback(data);
                            } else {
                                callback(result_layout.ok({
                                    meta: {
                                        success: true,
                                        msg: 'Пароль сгенерирован.'
                                    }
                                }));
                            }
                        });
                    }
                });
            } catch (exc) {
                return callback(result_layout.error(new Error('Общая ошибка изменения пароля. ' + exc.toString())));
            }
        }
    }
}