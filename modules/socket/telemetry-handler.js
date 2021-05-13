/**
 * @file modules/socket/telemetry-handler.js
 * @project node-service
 * @author Александр
 * @todo Обработчик телеметрии пользователей
 */

var logjs = require('../log');
var mailer = require('./mailer');

/**
 * обработчик телеметрии по WebSocket
 * @param {any} req - эмулирование request
 * @param {any} res - эмулирование response
 * @param {any} socket
 */
module.exports = function (in_req, in_res, socket) {
    return function (buffer) {
        var res = Object.assign({}, in_res);
        var req = Object.assign({}, in_req);
        req.socket = socket;
        mailer.to(req, res, buffer);
        
        logjs.debug('Полученны телеметрии от пользователя ' + res.user.c_login);
    }
}