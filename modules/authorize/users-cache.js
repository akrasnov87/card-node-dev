/**
 * @file modules/authorize/users-cache.js
 * @project node-service
 * @author Александр Краснов
 * @todo хранение информации о пользователе
 */

/**
 * пользователи
 */
var users = {};

exports.add = add;
exports.get = get;

/**
 * добавление в кэш
 * @param {ключ} key ключ
 * @param {any} data данные
 * @param {number} timeout время хранения в милисекундах 
 */
function add(key, data, timeout) {
    timeout = timeout || 30000;

    users[key] = {
        data: data,
        expired: Date.now() + timeout
    };
}

/**
 * получение данных
 * @param {*} key ключ
 * @returns {any} информация о пользователе
 */
function get(key) {
    return users[key];
}

setInterval(function () {
    var remove = [];
    for (var i in users) {
        var user = users[i];
        if (Date.now() > user.expired) {
            remove.push(i);
        }
    }

    remove.forEach(function (i) {
        delete users[i];
    });
}, 1000);