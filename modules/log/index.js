var log4js = require('./logToFile');
var args = require('args-parser')(process.argv);

/**
 * Лог
 * @param {string} message текст
 */
exports.log = function (message) {
    if (args.debug) {
        log4js.getLogger().info(message);
    }
    console.log(message);
}

/**
 * Отладка
 * @param {string} message текст
 */
exports.debug = function (message) {
    if (args.debug) {
        log4js.getLogger().debug(message);
    }
    console.debug(message);
}

/**
 * Ошибка
 * @param {string} message текст
 */
exports.error = function (message) {
    log4js.getLogger().error(message);
    console.error(message);
}