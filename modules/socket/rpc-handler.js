/**
 * @file modules/socket/rpc-handler.js
 * @project node-service
 * @author Александр
 * @todo обработчик RPC для websocket
 */

var rpcQuery = require('../rpc/modules/rpc-query');
var accessFilter = require('../rpc/modules/access-filter');
var logjs = require('../log');
var socketUtil = require('./utils');

/**
 * обработчик RPC для WebSocket
 * @param {any} req - эмулирование request
 * @param {any} res - эмулирование response
 * @param {any} socket
 */
module.exports = function (in_req, in_res, socket) {
    return function (data) {
        var req = Object.assign({}, in_req);
        var res = Object.assign({}, in_res);
        var sessionState = {
            user: res.user,
            isAuthorize: res.isAuthorize
        };

        var alias = data.data[0] ? data.data[0].alias : undefined;
        if (alias) {
            /**
             * псевдоним результата запроса
             */
            data.alias = alias;
        }

        accessFilter.filter(data, res.user.id, global.schemas, function (err, rows) {
            if (rows && data.data && data.data.length > 0) {
                logjs.debug('Выполнение удаленной процедуры через web-socket. ' + data.action + '.' + data.method + '. Пользователь ' + res.user.c_login);
                rpcQuery.query(sessionState, data.action, data.method, 1, data.data[0], null, null, function (result) {
                    socketUtil.rpc(socket, data.action, data.method, result.meta, result.result, result.code);
                });
            } else {
                logjs.debug('Выполнение удаленной процедуры через web-socket. ' + data.action + '.' + data.method + '. Для пользователь ' + res.user.c_login + ' завершилось ошибкой. ' + (err ? err.toString() : ''));
                socketUtil.rpc(socket, data.action, data.method, {
                    success: false,
                    msg: 'Bad request. ' + (err ? err.toString() : '')
                }, '', 500);
            }
        });
    }
}