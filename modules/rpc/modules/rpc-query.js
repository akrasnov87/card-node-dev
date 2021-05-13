/**
 * @file modules/rpc/modules/rpc-query.js
 * @project node-service
 * @author Александр
 * @todo обработчик запросов RPC
 */

var pkg = require('../../../package.json');
var utils = require('../../utils');

/**
 * массив контекстов
 * @type {any}
 */
var contexts = [];

/**
 * возвращается объект для получения мета информации 
 * @param {any[]} options дополнительные параметры
 * @returns {any} 
 * @example
 * meta({
 *      namespace: 'PN',
 *      accesses: [...]
 * })
 */
exports.meta = function (options, session) {
    var result = {
        enableBuffer: false,
        maxRetries: 1,
        url: "/rpc",
        type: "remoting",
        id: 'default',
        version: pkg.version,
        actions: {

        }
    };
    var accesses = options.accesses;
    delete options.accesses;
    if (options) {
        for (var i in options) {
            result[i] = options[i];
        }
    }

    contexts.forEach(function (context) {
        for (var i in context) {
            if (context[i].length == 0 || context[i].length == 1) {
                // таким образом не выводим private
                var item = context[i](session);
                var access = accesses.filter(function (k) {
                    return k.table_name == i || k.table_name == '*';
                });
                if (access.length > 0 || item.isLocal) {
                    var actions = [];
                    for (var j in item) {
                        if (typeof item[j] == 'function') {
                            actions.push({
                                name: j,
                                len: 1
                            });
                        }
                    }
                    result.actions[i] = actions;
                }
            }
        }
    });
    return result;
}

/**
 * выполнение запроса
 * @param {any} session что-то вроде сессии, для дополнительной обработки
 * @param {string} action наименование сущности
 * @param {string} method метод
 * @param {number} tid идентификатор транзакции
 * @param {any} data данные для обработки
 * @param {number} change состояние таблицы
 * @param {any} tableChange состояние таблиц
 * @param {function} callback функция обратного вызова
 */
exports.query = function (session, action, method, tid, data, change, tableChange, callback) {
    try {

        if(change && tableChange && change != 0 && change >= tableChange[action]) {
            // значит не нужно обращаться в БД
            return callback({
                tid: tid,
                type: 'rpc',
                method: method,
                action: action,
                result: {
                    records: [],
                    total: 0
                },
                meta: {
                    success: true
                },
                change: tableChange[action],
                code: 301,
                host: utils.getCurrentHost()
            });
        }

        var context = null;
        for (var i in contexts) {
            context = contexts[i];

            var actionFunction = context[action];
            if (actionFunction && typeof actionFunction == 'function') {
                var actionResult = actionFunction(session);
                if (actionResult && actionResult[method])
                    break;
            }
        }

        context[action](session)[method](data, function (result) {
            result.tid = tid;
            result.type = 'rpc';
            result.method = method;
            result.action = action;

            callback(result);
        });
    } catch (exc) {
        callback({
            tid: tid,
            type: 'rpc',
            method: method,
            action: action,
            result: {
                records: [],
                total: 0
            },
            meta: {
                success: false,
                msg: exc.toString()
            },
            code: 400,
            host: utils.getCurrentHost()
        });
    }
}

/**
 * регистрация контекста
 * @param {any} context контекст 
 */
exports.registryContext = function (context) {
    if (!Array.isArray(context))
        contexts.push(context);
    else {
        for (var i in context)
            contexts.push(context[i]);
    }
}