var utils = require('../utils');
var logjs = require('../log');

var SYNC_STATUS = 'synchronization-status';
var REGISTRY = 'registry';
var NOT_AUTH = 'not_auth';
var RPC = 'rpc';
var SYNC = 'synchronization';

/**
 * отправка сообщения по socket
 * @param {any} socket соединение
 * @param {string} message текст сообщения
 */
exports.send = send;

function send(socket, message, tid) {
    if (socket) {
        socket.emit(SYNC_STATUS, utils.socketOkResultLayout(message, tid));
    }
}

/**
 * объект для загрузки данных по socket
 * @param {string} tid
 */
exports.transfer = function(tid) {
    var data = utils.socketOkResultLayout(Buffer.from([]), tid);
    data.meta.processed = false;
    delete data.meta.tid;
    return data;
}

/**
 * RPC запрос
 * @param {any} socket соединение
 * @param {string} action
 * @param {string} method
 * @param {any} meta
 * @param {any} result
 * @param {number} code
 */
exports.rpc = function(socket, action, method, meta, result, code) {
    var data = utils.socketOkResultLayout(result);
    data.data = meta;
    data.code = code;
    data.action = action;
    data.method = method;

    //socket.emit(conf.get('remote_namespace') + '.' + action + '.' + method, data);
    socket.emit(RPC, data);
}

/**
 * синхронизация по socket. Ошибка
 * @param {any} socket соединение
 * @param {Error} err ошибки
 * @param {string} tid идентификатор
 */
exports.error = function(socket, err, tid) {
    var data = utils.socketFailResultLayout(err.toString(), 500, tid);
    data.result = Buffer.from([]);
    delete data.tid;
    socket.emit(SYNC, data);
}

/**
 * синхронизация по socket. Success
 * @param {any} socket соединение
 * @param {string} tid идентификатор
 */
exports.success = function(socket, obj, tid) {
    var data = utils.socketOkResultLayout(obj, tid);
    delete data.tid;
    socket.emit(SYNC, data);
}

/**
 * регистрация socket
 * @param {any} socket соединение
 */
exports.registry = function(socket) {
    if(socket) {
        socket.emit(REGISTRY, utils.socketOkResultLayout(''));
    }
}

/**
 * без авторизации
 * @param {any} socket соединение
 */
exports.noAuth = function(socket) {
    if(socket) {
        socket.emit(NOT_AUTH, utils.socketFailResultLayout('Пользователь не авторизован.', 401));
    }
}

/**
 * Логирование по socket
 * @param {any} socket соединение
 * @param {string} tid идентификатор пакета. Можно не передавать
 */
exports.log = function(socket, tid) {
    return new function() {

        this.log = function(message) {
            send(socket, message, tid);
        }

        this.error = function(message) {
            send(socket, message, tid);
            logjs.error(message);
            return message;
        }

        return this;
    }
}