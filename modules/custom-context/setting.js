/**
 * @file modules/custom-context/shell.js
 * @project node-service
 * @author Александр
 */

/**
 * объект для формирования ответа
 */
var result_layout = require('mobnius-pg-dbcontext/modules/result-layout');
var db = require('../dbcontext');

/**
 * Объект с набором RPC - работа с настройками приложений
 * Предназначен для чтения настроек для клиентских приложений
 * Настройки считываются только авторизованным пользователем.
 */
exports.setting = function (session) {

    return {
        isLocal: true, // нужно указывать, иначе безопасность при создании meta не пропустит

        /**
         * Получение настроек для клиентского приложения
         * @param {*} data 
         * @param {*} callback 
         * @example
         * // передаем тип настройки https://mobnius.ru/?p=184
         * [{ action: "setting", method: "getSettings", data: [{ "params": ['MBL'] }], type: "rpc", tid: 0 }]
         */
        getSettings: function (data, callback) {
            var prefix = data.params ? data.params[0] : 'ALL';

            db.cd_settings().Query({
                select: 'c_key, c_value, f_type___c_const, f_user, c_label, c_summary',
                filter: [{
                    property: "c_key",
                    operator: 'ilike',
                    value: prefix + '_%'
                }, 'OR', {
                    property: "f_user",
                    value: session.user.id
                }],
                limit: 1000
            }, function (data) {
                if (data.meta.success == true) {
                    var records = data.result.records.filter(function (item) { return !item.f_user && !item.f_division; });
                    var obj = {};
                    var idx = 0;
                    while (records.length > 0) {
                        for (var i = 0; i < records.length; i++) {
                            var record = records[i];
                            obj[record.c_key] = {
                                key: record.c_key,
                                value: record.c_value,
                                type: record.f_type___c_const,
                                label: record.c_label,
                                summary: record.c_summary
                            };
                        }
                        if (idx == 0) {
                            records = data.result.records.filter(function (item) { return item.f_division; });
                            idx++;
                        } else {
                            if (idx == 1) {
                                records = data.result.records.filter(function (item) { return item.f_user; });
                                idx++;
                            }
                            records = [];
                        }
                    }
                    callback(result_layout.ok([obj]));
                } else {
                    callback(result_layout.error(new Error(data.meta.msg)));
                }
            })
        }
    }
}