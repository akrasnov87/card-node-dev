/**
 * @file modules/authorize/authorization-db.js
 * @project node-service
 * @author Александр
 */

var saltHash = require('./saltHash');
var db = require('../dbcontext');
var cache = require('./users-cache');

/**
 * возвращается информация о пользователе
 * @param {string} userName имя пользователя
 * @param {string} password пароль пользователя
 * @param {function} callback функция обратного вызова
 * @example
 * getUser('user', 'password', function(user, original) {
 *      if(user.id > 0) {
 *          // пользователь авторизован
 *      }
 *      // в переменной original храниться информация о пользователе, если она есть в БД
 * });
 */
exports.getUser = function (userName, password, callback) {
    if (typeof callback == 'function') {
        var user = {
            id: -1,
            claims: ''
        };

        function getData(inner_callback) {
            if (cache.get(userName) != null) {
                inner_callback(cache.get(userName).data);
            } else {
                db.getUser(userName, function (data) {
                    cache.add(userName, data);
                    inner_callback(data);
                });
            }
        }

        getData(function (data) {
            if (data.meta.success == false || data.result.total == 0) {
                callback(user, null);
            } else {
                var data = data.result.records[0];
                if (data.s_salt || data.b_pgcrypto == true) {
                    function crypto(innerCallback) {
                        if(data.b_pgcrypto == true) {
                            db.provider.db().query("select crypt('" + password + "', '" + data.s_hash + "');", null, (err, rows, time) => {
                                innerCallback(rows.rows[0].crypt == data.s_hash);
                            });
                        } else {
                            innerCallback(saltHash.check(password, data.s_salt, data.s_hash));
                        }
                    }
                    crypto((valid)=> {
                        if (valid == true) {
                            return callback(data, null);
                        } else {
                            callback(user, data);
                        }
                    });
                } else {
                    if (data.c_password == password) {
                        return callback(data, null);
                    } else {
                        callback(user, data);
                    }
                }
            }
        });
    }
}

/**
 * удаление пользователя
 * @param {number} userid идентификатор пользователя
 * @param {function} callback функция обратного вызова
 */
exports.removeUser = function (userid, callback) {
    if (typeof callback == 'function') {
        db.provider.db().query('delete from core.pd_userinroles where f_user = $1', [userid], function (err, rows) {
            if (err) {
                callback(err);
            } else {
                db.provider.db().query('delete from core.pd_users where id = $1', [userid], function (err, rows) {
                    callback(err);
                });
            }
        });
    }
}

/**
 * восстановление пароля. Будет сгенерирован новый пароль
 * @param {string} userName тип восстановления
 * @param {string} password старый пароль
 * @param {function} callback функция обратного вызова
 */
exports.passwordReset = function (userName, password, callback) {
    if (typeof callback == 'function') {
        db.getUser(userName, function (data) {
            if (data.meta.success == false || data.result.total == 0) {
                callback(new Error('Пользователь ' + userName + ' не найден'));
            } else {
                var data = data.result.records[0];

                function crypto(innerCallback) {
                    if(data.b_pgcrypto == true) {
                        db.provider.db().query("select crypt('" + password + "', gen_salt('bf', 8));", null, (err, rows, time) => {
                            innerCallback({
                                passwordHash: rows.rows[0].crypt,
                                salt: ''
                            });
                        });
                    } else {
                        innerCallback(saltHash.generate(password));
                    }
                }

                crypto((pswData) => {
                    db.pd_users().Update({
                        id: data.id,
                        s_salt: pswData.salt,
                        s_hash: pswData.passwordHash
                    }, function (data) {
                        if (data.meta.success == false) {
                            callback(new Error('Ошибка обновления пользователя: ' + data.meta.msg));
                        } else {
                            callback(null, pswData);
                        }
                    });
                });
            }
        });
    }
}