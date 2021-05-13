/**
 * @file modules/system-logs/audit.js
 * @project node-service
 * @author Александр
 * @todo буфер аудита
 */

/**
 * буфер
 * @type {any[]}
 */
var buffers = [];

/**
 * размер буфера
 * @type {number}
 */
var BUFFER_SIZE = 25;

/**
 * timeout
 * @type {any}
 */
var timer = null;

var db = require('../dbcontext');
var logjs = require('../log');

/**
 * Обработчик логирования
 * @param {any} data данные 
 * @param {any} options дополнительные параметры
 * @example
 * ({...}, {
 *      buffer: 50,
 *      flush: true // принудительная запись
 * })
 */
module.exports = function (data, options) {
    var flush = false;
    if (typeof options == 'object') {
        BUFFER_SIZE = options.buffer || BUFFER_SIZE;
        flush = options.flush == undefined ? false : options.flush;
    }

    buffers.push(Object.assign({
        s_created: new Date()
    }, data));

    if (buffers.length > BUFFER_SIZE || flush == true) {
        if (db && db.ad_audits) {
            db.ad_audits().Add(buffers, function () {
                logjs.debug('Запись аудита, так как буфер достиг объема ' + buffers.length + '. Лимит ' + BUFFER_SIZE);
            });
        }
        buffers = [];

        clearTimeout(timer);
        timer = null;
    } else {
        if (!timer) {
            timer = setTimeout(function () {
                if (buffers.length > 0) {
                    if (db && db.ad_audits) {

                        db.ad_audits().Add(buffers, function () {
                            logjs.debug('Запись аудита по таймеру. Размер: ' + buffers.length);
                        });
                    }
                    buffers = [];
                }
                clearTimeout(timer);
                timer = null;
            }, 5000);
        }
    }
}