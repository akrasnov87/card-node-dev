var userCollection = require('./connection-stack');
var logjs = require('../log');
var packager = require('mobnius-packager/index-v2');
var handler = require('../rpc/modules/rpc-handler');

/**
 * Отправка письма
 * @param {any} socket соединение
 * @param {Buffer} buffer данные
 */
exports.to = to;

function to(req, res, buffer) {
    var socket = req.socket;
    var pkgRead = packager.read(buffer);
    pkgRead.readData();
    var data = pkgRead.data;

    // тут всегда предполагается, что будет только одно сообщение
    var item = data.to[0].data[0][0];
    var toClient = item.fn_user_to;
    var fromClient = item.fn_user_from;

    if (item.c_group) {
        logjs.debug('Отправка группе ' + item.c_group + ' от ' + fromClient);
        socket.broadcast.to(item.c_group).emit('mailer-group-from', buffer);
    } else {
        var users = userCollection.getUsers(toClient);
        req.body = data.to;
        handler(req, res, function (results) {
            if (users.length > 0) {

                // тут нужно сформировать новый пакет
                var pkg = packager.write();
                pkg.meta(false, 'mail', 'v2', Date.now().toString());
                pkg.blockTo('to0', data.to[0]);
                pkg.blockFrom('from0', results[0]);
                var bufferResult = pkg.flush(0, pkgRead.type);

                logjs.debug('Отправка ' + users.length + ' клиенту(ам) с идентификаторами ' + toClient + ' от ' + fromClient);
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];

                    socket.emit('mailer-from', bufferResult);
                    user.emit('mailer-from', bufferResult);
                }
            } else {
                if (socket != null) {
                    logjs.debug('Получатель ' + toClient + ' не найден. Отправитель ' + fromClient);
                    socket.emit('mailer-from', packager.updateStatus(buffer, '8'));
                }
            }
        });
    }
}

/**
 * Отправка текстового сообщения. В продукцион не должен применяться
 * @param socket {any}
 * @param fromUser {string} от кого
 * @param toUser {string} кому
 * @param group {string} группе
 */
exports.sendText = function (req, res, obj) {
    var pkg = packager.write();
    pkg.meta(false, 'mail', 'v2', Date.now().toString());
    pkg.blockTo('to0', { action: 'cd_notifications', method: 'Add', data: [[obj]], tid: 0, type: 'rpc' });

    to(req, res, pkg.flush(0, 'NML'));
}