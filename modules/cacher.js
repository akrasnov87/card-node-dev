/**
 * @file modules/cacher.js
 * @project node-service
 * @author Александр
 */

var accessesCacher = require('./rpc/modules/accesses-cacher');
var logjs = require('./log');

/**
 * перегрузка кэшированных данных
 * @param {function} callback функция обратного вызова
 */
exports.reload = function (callback) {
    // сбросить буфер безопасности
    accessesCacher.clearBuffer();
    logjs.debug('Кэш безопасности сброшен. core.pd_accesses is reset');
    if (typeof callback == 'function')
        callback();
}