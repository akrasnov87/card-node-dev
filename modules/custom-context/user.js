/**
 * @file modules/custom-context/user.js
 * @project node-service
 * @author Александр
 */

/**
 * объект для формирования ответа
 */
var result_layout = require('mobnius-pg-dbcontext/modules/result-layout');
var db = require('../dbcontext');
var salt = require('../authorize/saltHash');

/**
 * Объект с набором RPC функций
 */
exports.user = function (session) {

    return {
        isLocal: true, // нужно указывать, иначе безопасность при создании meta не пропустит

        /**
         * получение информации о пользователе
         * @param {*} data 
         * @param {*} callback
         * @example
         * [{"action":"user","method":"getUser","data":[{}],"type":"rpc"}]
         */
        getUser: function (data, callback) {
            if (session.isAuthorize == true) {
                db.pv_users().Query({
                    filter: [{
                        property: 'id',
                        value: session.user.id
                    }]
                }, function (result) {
                    if (result.meta.success == true) {
                        var items = result.result.records;
                        if (items.length == 1) {
                            var item = items[0];
                            callback(result_layout.ok([item]));
                        } else {
                            callback(result_layout.error(new Error("Информация о пользователе не найдена.")));
                        }
                    } else {
                        callback(result_layout.error(new Error(result.meta.msg)));
                    }
                })
            } else {
                callback(result_layout.error(new Error('Получение профиля по не авторизованному пользователю.')));
            }
        },

        /**
         * обновление пользователя
         * @param {any} data 
         * @param {function} callback  
         * @example
         * [{"action":"user","method":"updateCurrentUser","data":[{ "c_first_name": "test" }],"type":"rpc"}]
         */
        updateCurrentUser: function (data, callback) {
            if (session.isAuthorize == true) {
                delete data.c_password;
                delete data.s_salt;
                delete data.s_hash;
                delete data.c_login;
                delete data.b_pgcrypto;

                data.id = session.user.id;
                db.pd_users().Update(data, function (result) {
                    if (result.meta.success == true) {
                        callback(result_layout.ok([true]));
                    } else {
                        callback(result_layout.error(new Error(result.meta.msg)));
                    }
                });
            } else {
                callback(result_layout.error(new Error('Обновление не авторизованным пользователем.')));
            }
        },

        /**
         * обновление другого пользователя
         * @param {any} data 
         * @param {function} callback  
         * @example
         * [{"action":"user","method":"updateOtherUser","data":[{ "id":1, "c_first_name": "test"}],"type":"rpc"}]
         */
        updateOtherUser: function (data, callback) {
            if (session.isAuthorize == true) {
                delete data.c_password;
                delete data.s_salt;
                delete data.s_hash;
                delete data.c_login;
                delete data.b_pgcrypto;

                if(data.id == null || data.id == undefined || data.id == '') {
                    callback(result_layout.error(new Error('Идентификатор пользователя не найден')));
                } else {
                    this.priorityUser({ params: [data.id]}, function(r) {
                        if(r.meta.success && r.result.records[0] == true) {
                            db.pd_users().Update(data, function (result) {
                                if (result.meta.success == true) {
                                    callback(result_layout.ok([true]));
                                } else {
                                    callback(result_layout.error(new Error(result.meta.msg)));
                                }
                            });
                        } else {
                            callback(result_layout.error(new Error('Недостаночно прав для обновления пользователя.')));
                        }
                    });
                }
            } else {
                callback(result_layout.error(new Error('Обновление не авторизованным пользователем.')));
            }
        },

        /**
         * обновление роли у пользователя
         * @param {*} data 
         * @param {*} callback 
         * @example
         * [{"action":"user","method":"updateClaims","data":[{ "id":1, "c_claims": '["inspector"]'}],"type":"rpc"}]
         */
        updateClaims: function(data, callback) {
            if (session.isAuthorize) {
                var currentClaims = session.user.c_claims;
                var user_id = data.id;
                var claims = data.c_claims;

                if (user_id) {
                    // текущая роль
                    var mainClaims = currentClaims.split('.')[1];
                    if (mainClaims) {
                        db.pd_roles().Query({ limit: 10000, sort: [{ property: "n_weight", direction: "DESC" }] }, function (result) {
                            if (result.meta.success) {
                                try {
                                    var roles = result.result.records;
                                    // главная роль текущего пользователя
                                    var mainClaimWeight = roles.filter(function (role) { return role.c_name == mainClaims })[0].n_weight;
                                    var createClaims = JSON.parse(claims);
                                    // массив ролей к которым должен быть привязан пользователь
                                    var createClaimsWeight = [];
                                    for (var idx in createClaims) {
                                        var claim = roles.filter(function (role) { return role.c_name == createClaims[idx] })[0];
                                        if (claim) {
                                            createClaimsWeight.push(claim);
                                        }
                                    }
                                    if (createClaimsWeight.length > 0 && createClaimsWeight.filter(function (c) { return c.n_weight <= mainClaimWeight; }).length == createClaimsWeight.length) {
                                        db.pf_update_user_roles().Query({ params: [user_id, claims]}, function(result) {
                                            if (result.meta.success) {
                                                callback(result_layout.ok([{ id: user_id }]));
                                            } else {
                                                callback(result_layout.error(new Error(result.meta.msg)));
                                            }
                                        });
                                    } else {
                                        callback(result_layout.error(new Error('Недостаночно прав на обновление роли у пользователя.')));
                                    }
                                } catch(e) {
                                    callback(result_layout.error(e));
                                }
                            } else {
                                callback(result_layout.error(new Error(result.meta.msg)));
                            }
                        });
                    } else {
                        callback(result_layout.error(new Error('Главная роль не найдена.')));
                    }
                } else {
                    callback(result_layout.error(new Error('Одно из обязательных полей равно null.')));
                }
            } else {
                callback(result_layout.error(new Error('Обновление не авторизованным пользователем.')));
            }
        },

        /**
         * Создание пользователя
         * @param {*} data 
         * @param {*} callback 
         * @example
         * [{"action":"user","method":"createUser","data":[{ "login": "login", "password": "password" }],"type":"rpc"}]
         * // подстановка поля id происходит из авторизации
         * PN.user.createUser({
         *      login: '',
         *      password: ''
         * }, function(){});
         */
        createUser: function (data, callback) {
            if(session.isAuthorize) {
                var login = data.login;
                // применяется ли шифрованние на стороне postgresql 
                var pgcrypto = data.pgcrypto || false;

                var password = data.password.toString();

                function crypto(innerCallback) {
                    if(pgcrypto == true) {
                        db.provider.db().query("select crypt('" + password + "', gen_salt('bf', 8));", null, (err, rows, time) => {
                            innerCallback({
                                passwordHash: rows.rows[0].crypt,
                                salt: ''
                            });
                        });
                    } else {
                        innerCallback(salt.generate(password));
                    }
                }

                if(login && password) {
                    crypto(function(obj) {
                        db.pd_users().Count({filter:[{"property": "c_login", "value": login}]}, function(result) {
                            if(result.meta.success && result.result.total == 0) {
                                db.pd_users().Add({ 
                                    c_login: login, 
                                    s_salt: obj.salt, 
                                    s_hash: obj.passwordHash, 
                                    b_disabled: false, 
                                    sn_delete: false,
                                    b_pgcrypto: pgcrypto 
                                }, function(result) {
                                    if(result.meta.success) {
                                        var id = result.result.records.rows[0].id;
                                        callback(result_layout.ok([{id:id}]));
                                    } else {
                                        callback(result_layout.error(new Error(result.meta.msg)));
                                    }
                                });
                            } else {
                                callback(result_layout.error(new Error('Пользователь с указанным логином присутствует в системе.')));
                            }
                        });
                    });
                } else {
                    callback(result_layout.error(new Error('Одно из обязательных полей равно null.')));
                }
            } else {
                callback(result_layout.error(new Error('Создание не авторизованным пользователем.')));
            }
        },

        
        /**
         * Получаем информацию, есть ли приоритер у пользователя над другим пользователем
         * @param {*} data 
         * @param {*} callback 
         * @example
         * [{ action: "user", method: "priorityUser", data: [{ params:[other_user_id] }], type: "rpc", tid: 0 }] 
         */
        priorityUser: function(data, callback) {
            if(session.isAuthorize) {
                var params = data.params;
                if(params != null && Array.isArray(params)) {
                    var current_user_id  = session.user.id;
                    var other_user_id = params[0];

                    if(current_user_id == null || current_user_id == undefined || current_user_id == '') {
                        callback(result_layout.error(new Error('Идентификатор пользователя не найден')));
                    } else {
                        var currentClaims = session.user.c_claims;
                        db.pv_users().Query({
                            filter: [{
                                property: 'id',
                                value: other_user_id
                            }]
                        }, function (result) {
                            if (result.meta.success == true) {
                                var items = result.result.records;
                                if (items.length == 1) {
                                    var item = items[0];
                                    var claims = item.c_claims.substr(1, item.c_claims.length - 2).split('.');

                                    // текущая роль
                                    var mainClaims = currentClaims.split('.')[1];
                                    if (mainClaims) {
                                        db.pd_roles().Query({ limit: 10000, sort: [{ property: "n_weight", direction: "DESC" }] }, function (result) {
                                            if (result.meta.success) {
                                                try {
                                                    var roles = result.result.records;
                                                    // главная роль текущего пользователя
                                                    var mainClaimWeight = roles.filter(function (role) { return role.c_name == mainClaims })[0].n_weight;
                                                    // массив ролей к которым должен быть привязан пользователь
                                                    var createClaimsWeight = [];
                                                    for (var idx in claims) {
                                                        var claim = roles.filter(function (role) { return role.c_name == claims[idx] })[0];
                                                        if (claim) {
                                                            createClaimsWeight.push(claim);
                                                        }
                                                    }
                                                    if (createClaimsWeight.length > 0 && createClaimsWeight.filter(function (c) { return c.n_weight <= mainClaimWeight; }).length == createClaimsWeight.length) {
                                                        callback(result_layout.ok([true]));
                                                    } else {
                                                        callback(result_layout.ok([false]));
                                                    }
                                                } catch(e) {
                                                    callback(result_layout.error(e));
                                                }
                                            } else {
                                                callback(result_layout.error(new Error(result.meta.msg)));
                                            }
                                        });
                                    } else {
                                        callback(result_layout.error(new Error('Главная роль не найдена.')));
                                    }
                                } else {
                                    callback(result_layout.error(new Error("Информация о пользователе не найдена.")));
                                }
                            } else {
                                callback(result_layout.error(new Error(result.meta.msg)));
                            }
                        });
                    }
                } else {
                    callback(result_layout.error(new Error('Параметр передан неверный')));
                }
            } else {
                callback(result_layout.error(new Error('Выполнениие не авторизованным пользователем.')));
            }
        }
    }
}