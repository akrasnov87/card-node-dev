/**
 * @file modules/socket/notification-handler.js
 * @project node-service
 * @author Александр
 * @todo Обработчик информации об устройстве пользователя
 */
var logjs = require('../log');
var mailer = require('./mailer');
var packager = require('mobnius-packager/index-v2');
var handler = require('../rpc/modules/rpc-handler');

/**
 * обработчик информации об устройстве по WebSocket
 * @param {any} req - эмулирование request
 * @param {any} res - эмулирование response
 * @param {any} socket
 * @example
 * // socket.on('notification', ...)
 */
module.exports = function (in_req, in_res, socket) {
    return function (buffer) {
        var res = Object.assign({}, in_res);
        var req = Object.assign({}, in_req);

        mailer.to(req, res, buffer);
        logjs.debug('Получена сообщение от пользователя ' + res.user.c_login);
    }
}