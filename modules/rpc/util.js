/**
 * @file modules/rpc/util.js
 * @project node-service
 * @author Александр
 */

var crypto = require('crypto');
var logjs = require('../log');
var layout = require('mobnius-pg-dbcontext/modules/result-layout');

/**
 * generates random string of characters i.e salt
 * @param {number} length - Length of the random string.
 * @returns {string}
 */
exports.genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0, length); /** return required number of characters */
}

/**
 * вызываем обработчик для вывода ошибок в запросе
 * @param {any} res response
 * @param {string} message строка с ошибкой
 * @param {string} fullMessage полный текст сообшения
 */
exports.failResponse = function (res, message, fullMessage) {
    logjs.error(message + ' ' + (fullMessage || ''));
    res.json({
        meta: {
            success: false,
            msg: message,
            fullMsg: fullMessage
        }
    });
}

/**
 * вызываем обработчик для возвращения положительного результата
 * @param {any} res response
 * @param {any} data данные
 */
exports.successResponse = function (res, data) {
    res.json(layout.ok(data));
}