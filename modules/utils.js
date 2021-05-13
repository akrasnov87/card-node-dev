var socketUtils = require('./socket/utils');
var logjs = require('./log');
var args = require('args-parser')(process.argv);
var conf = require('node-config')(__dirname, '../');

/**
 * Положительный результат сокет сообщения
 * @param {any} obj данные для передачи
 * @param {string} tid идентификатор. Может быть пустым
 * @returns объект
 */
exports.socketOkResultLayout = function (obj, tid) {

    var data = {
        meta: {
            processed: true
        },
        data: {
            success: true,
            msg: ''
        },
        result: obj,
        code: 200,
        host: getCurrentHost()
    };

    if (tid) {
        data.tid = tid;
        data.meta.tid = tid;
    }

    return data;
}

/**
 * Ошибочный результат сокет сообщения
 * @param {string} message текст ошибки
 * @param {number} code код результата, например, 200, 401 и т.д.
 * @param {string} tid идентификатор. Может быть пустым
 * @returns объект
 */
exports.socketFailResultLayout = function (message, code, tid) {

    var data = {
        meta: {
            processed: true
        },
        data: {
            success: false,
            msg: message
        },
        code: code,
        host: getCurrentHost()
    }

    if (tid) {
        data.tid = tid;
        data.meta.tid = tid;
    }

    return data;
}

/**
 * Запись файла
 * @param {any} session сессия
 */
exports.writeFile = function (session) {
    var socketLog = socketUtils.log(session.request.socket, session.request.tid);

    return new function () {

        this.toResponce = function (id, name, bytes) {
            if (!session.response.attachments) {
                session.response.attachments = [];
            }
            session.response.attachments.push({
                link: id,
                name: name,
                buffer: bytes
            });
        }

        this.toError = function (record, message) {
            record.__error = message;
            logjs.error(record.__error);
            socketLog.log(record.__error);
        }

        return this;
    }
}

exports.fileReader = function (session) {
    return new function () {
        var files = session.request.attachments;

        this.getFile = function (name) {
            for (var i in files) {
                var file = files[i];
                if (file.name == name)
                    return file;
            }
            return null;
        }

        this.getFileByKey = function (key) {
            for (var i in files) {
                var file = files[i];
                if (file.key == key)
                    return file;
            }
            return null;
        }

        return this;
    }
}

/**
 * отслеживание прогресса обработки файлов
 * @param {any} logger socket log
 * @param {number} totalCount общее количество данных
 */
exports.progressFile = function (logger, totalCount) {
    return new function () {
        var idx = 0;
        var avg = [];
        var startDt = Date.now();

        var iterDt = 0;

        this.init = function (time) {
            logger.log('Получено из БД ' + totalCount + ' файлов за ' + time + ' мс.');
        }

        this.beforeNext = function () {
            iterDt = Date.now();
        }

        this.next = function (message) {
            idx++;
            var time = Date.now() - iterDt;
            avg.push(time);
            //logger.log('[LOGS]' + '(' + idx + '/' + totalCount + ')');
            //logger.log('Файл ' + idx + '/' + totalCount + ' ' + message + '. Выполнено за ' + time + ' мсек.');
        }

        this.finish = function (message) {
            var sum = 0;
            for (var i in avg) {
                sum += avg[i];
            }

            var avgMessage = 'Средняя скорость обработки ' + (sum / (totalCount || 1)).toFixed(2) + ' мс.';
            logjs.debug(avgMessage);
            logger.log(avgMessage);
            logjs.debug(message);

            idx = 0;
            avg = [];
            startDt = null;
            iterDt = null;
        }

        this.getTime = function () {
            return (Date.now() - startDt) / 1000;
        }

        this.getTotalCount = function () {
            return totalCount;
        }

        return this;
    }
}

/**
 * Создание мета-блока
 * @param {to} string кому
 * @param {from} string от кого
 * @param {groups} string отправить группе
 */
exports.createMeta = function (to, from, groups) {
    return {
        to: to,
        from: from,
        groups: groups,
        tid: pm.getGUID()
    }
}

/**
 * Получение текущего хоста
 * @returns {string}
 */
exports.getCurrentHost = getCurrentHost;

function getCurrentHost() {
    return 'localhost:' + args.port;
}

/**
 * Получение виртуального каталога
 * @returns {string}
 */
exports.getVirtualDirPath = function () {
    return args.virtual_dir_path || conf.get('virtual_dir_path');
}

/**
 * Строка подключения к БД
 * @returns {string}
 */
exports.getConnectionString = function () {
    return args.connection_string || conf.get('connectionString');
}