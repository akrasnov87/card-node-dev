/**
 * @file modules/socket/download-handler.js
 * @project node-service
 * @author Александр
 * @todo загрузка файлов на клиент
 */

var util = require('../catalog-util');
var join = require('path').join;
var logjs = require('../log');
var socketUtil = require('./utils');

/**
 * обработчик синхронизации для WebSocket
 * @param {any} req - эмулирование request
 * @param {any} res - эмулирование response
 * @param {any} socket
 */
module.exports = function (in_req, in_res, socket) {
    var root = join(__dirname, '../', '../', 'files');

    return function (version, position, chunk, tid) {

        var req = Object.assign({}, in_req);
        var res = Object.assign({}, in_res);
        req.socket = socket;

        var result = socketUtil.transfer(tid);

        var dir = join(root, util.getCatalogName(new Date()).toString());

        util.download(dir, tid, position, chunk, function (err, buffer, totalLength) {
            if (err) {
                result.data.success = false;
                result.data.msg = err.toString();
                logjs.error('DOWNLOAD_HANDLER Ошибка чтения байтов из файла. TID=' + tid + '. ' + result.data.msg);
                result.meta.start = position;
                result.meta.totalLength = totalLength;
                socket.emit('download', result);
            } else {
                result.meta.start = position + chunk;
                result.meta.totalLength = totalLength;
                result.result = buffer;
                if ((position + chunk) >= totalLength) {
                    result.meta.processed = true;
                }

                socket.emit('download', result);
            }
        });
    }
}