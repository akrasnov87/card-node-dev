/**
 * @file modules/system-logs/index.js
 * @project node-service
 * @author Александр
 */

var dbAudit = require('./audit');

/**
 * запись данных в аудит
 * @param {string} fn_user идентификатор
 * @param {any} date дата
 * @param {any} data идентификатор записи
 * @param {string} type логин пользователя
 * @param {string} app_id идентификатор приложения
 */
exports.audit = function (fn_user, date, data, type, app_id) {
    dbAudit({
        fn_user: fn_user,
        c_data: data,
        c_type: type,
        d_date: date,
        c_app_name: app_id || 'backend'
    });
}