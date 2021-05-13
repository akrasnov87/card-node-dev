/**
 * @file modules/socket/rpc-handler.js
 * @project node-service
 * @author Александр
 * @todo обработчик RPC для websocket
 */

var handler = require('../synchronization/handler');
var util = require('../catalog-util');
var socketUtil = require('./utils');
var join = require('path').join;
var fs = require('fs');
var logjs = require('../log');

/**
 * обработчик синхронизации для WebSocket
 * @param {any} req - эмулирование request
 * @param {any} res - эмулирование response
 * @param {any} socket
 */
module.exports = function (in_req, in_res, socket) {
    var root = join(__dirname, '../', '../', 'files');
    return function (tid, version) {

        var req = Object.assign({}, in_req);
        var res = Object.assign({}, in_res);

        req.socket = socket;
        var dir = join(root, util.getCatalogName(new Date()).toString());
        fs.readFile(join(dir, tid + '.bkp'), function (err, buffer) {
            if (err) {
                logjs.error('Ошибка синхронизации. Чтения пакета ' + tid + ' от пользователя ' + res.user.c_login + '. ' + err.toString());
                socketUtil.error(socket, err, tid);
            } else {
                var dir = join(root, util.getCatalogName(new Date()).toString());
                handler(req, res, buffer, version, function (code, bytes) {
                    if (bytes) {
                        fs.writeFile(join(dir, tid + '.pkg'), bytes, function (err) {
                            if (err) {
                                logjs.error('Ошибка синхронизации. Выполнение пакета ' + tid + ' от пользователя ' + res.user.c_login + '. ' + err.toString());
                                socketUtil.error(socket, err, tid);
                            } else {
                                if (code == 200) {
                                    socketUtil.success(socket, Buffer.from([]), tid);
                                } else {
                                    socketUtil.error(socket, bytes, tid);
                                }
                            }
                        });
                    } else {
                        logjs.error('Ошибка синхронизации. Выполнение пакета ' + tid + ' от пользователя ' + res.user.c_login + '. ' + 'Массив байтов не создан');
                        socketUtil.error(socket, new Error('Массив байтов не создан'), tid);
                    }
                });
            }
        });
    }
}