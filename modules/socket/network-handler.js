/**
 * @file modules/socket/network-handler.js
 * @project node-service
 * @author Александр
 * @todo Обработчик сотсояния сети пользователя
 */

var logjs = require('../log');
var utils = require('../utils');
var packager = require('mobnius-packager/index-v2');

/**
 * обработчик сети по WebSocket
 * @param {any} user пользователь
 * @param {any} io
 * @param {string} status статус
 * @example
 * // socket.on('network', ...)
 * {
 *      userId: number - идентификтаор пользователя
 *      type: string - статус ONLINE | OFFLINE
 * }
 */
module.exports = function (user, io, status) {
    var obj = {
        id: user.id,
        type: status,
        c_login: user.c_login,
        c_claims: user.c_claims,
        c_version: user.c_version
    };

    var response = {
        code: 200,
        action: 'cd_notifications',
        method: 'Add',
        meta: {
            success: true,
            msg: ''
        },
        result: {
            records: [obj],
            total: 1
        },
        tid: 0,
        type: 'rpc',
        host: utils.getCurrentHost()
    };

    var pkg = packager.write();
    pkg.meta(false, 'mail', 'v2', Date.now().toString());
    pkg.blockTo('to0', response);

    io.to('manager').emit('network', pkg.flush(0, 'NML'));
    io.to('master').emit('network', JSON.stringify(obj));
    logjs.debug('Получен статус сети ' + status + ' от пользователя ' + user.c_login + ' в ' + new Date().toISOString());
}