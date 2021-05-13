/**
 * @file modules/rpc/modules/rpc-handler.js
 * @project node-service
 * @author Aleksandr Krasnov
 */

var rpcQuery = require('../modules/rpc-query');
var accessFilter = require('../modules/access-filter');
var rpcInjection = require('../../rpc-injection');
var logjs = require('../../log');
var utils = require('../../utils');
var accessesCacher = require('./accesses-cacher');
var keygen = require('../../authorize/keygen');

module.exports = function (req, res, finish) {
    var dt = new Date();
    var body = req.body;
    var results = [];
    var schema = global.schemas;

    var sessionState = {
        user: res.user,
        isAuthorize: res.isAuthorize,
        response: res,
        request: req
    };

    function next(tableChange, callback) {
        var item = body[0];
        if (item) {
            logjs.debug('RPC запрос пользователя ' + res.user.c_login + ': ' + JSON.stringify(item));

            body.shift();
            if (!item.data || (item.data && !Array.isArray(item.data))) {
                results.push(createBadRequest(req, res, item, new Error('Требуется указать свойство data: [{}]')));
                return next(tableChange, callback);
            }

            var alias = item.data[0].alias;
            if (alias) {
                /**
                 * псевдоним результата запроса
                 */
                item.alias = alias;
            }

            accessFilter.filter(item, res.user.id, schema, function (err, rows) {
                if (rows && item.data && item.data.length > 0) {
                    rpcQuery.query(sessionState, item.action, item.method, item.tid, item.data[0], item.change, tableChange, function (result) {
                        if (item.method != 'Query' && item.method != 'Exists' && item.method != 'Select') { // тут добавлен аудит для записей
                            var table = schema.tables.filter(function (i) {
                                return i.TABLE_NAME == item.action;
                            })[0];

                            if (table) {
                                result.result.records = item.data[0];
                                result.result.total = result.result.records.length;
                            }
                        }
                        if(keygen.check() != true) {
                            result.meta.activate = false;
                        }
                        result.authorizeTime = res.authorizeTime;
                        result.rpcTime = new Date() - dt;
                        result.host = utils.getCurrentHost();
                        if (alias) {
                            result.action = alias;
                        }
                        results.push(result);
                        // добавлена injection
                        rpcInjection.handler(sessionState, item.action, item.method, item.data[0], result);
                        next(tableChange, callback);
                    });
                } else {
                    if (rows == null && res.user.id == -1) { // значит не авторизовался
                        return res.json([{
                            meta: {
                                success: false,
                                msg: 'No authorize'
                            },
                            code: 401,
                            tid: item.tid,
                            type: "rpc",
                            method: item.method,
                            action: item.action,
                            host: utils.getCurrentHost()
                        }]);
                    }
                    if (err == null && rows == null) {
                        err = new Error('Пользователь не имеет прав на выполнение операции.');
                    }
                    if (!item.data || item.data.length == 0) {
                        err = new Error('Условия запроса не указаны.');
                    }
                    var response = createBadRequest(req, res, item, err);
                    results.push(response);

                    next(tableChange, callback);
                }
            });
        } else {
            callback();
        }
    }

    getTableState(req.isFrom, res.user, function(tableChange) {
        if (Array.isArray(body) == true) {
            next(tableChange, function () {
                finish(results);
            });
        } else {
            body = [body];
            next(tableChange, function () {
                finish(results);
            });
        }
    });
}

function getTableState(isFrom, user, callback) {
    accessesCacher.getTableState(isFrom, user, callback);
}

/**
 * создание ответа на запроса
 * @param {*} req 
 * @param {*} res 
 * @param {*} itemRPC запрос RPC
 * @param {*} err ошибка
 * @returns {any}
 */
function createBadRequest(req, res, itemRPC, err) {
    var response = {
        code: 400,
        action: itemRPC.action,
        method: itemRPC.method,
        meta: {
            success: false,
            msg: 'Bad request ' + (err ? err.toString() : '') + '. Body: ' + JSON.stringify(itemRPC)
        },
        result: {
            records: [],
            total: 0
        },
        tid: itemRPC.tid,
        type: 'rpc',
        host: utils.getCurrentHost()
    };
    console.error(response.meta.msg);
    return response;
}