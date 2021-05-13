/**
 * @file modules/dbcontext.js
 * @project node-service
 * @author Александр
 * @todo автоматически сгенеренный код
 */
var provider = require('mobnius-pg-dbcontext');
var filter = require('./rpc/modules/access-filter');
var utils = require('./utils');
provider.initPool(utils.getConnectionString(), global.schemas);
var args = require("args-parser")(process.argv);

/**
 * Специальный компонент для создания ручных запросов
 * @example
 * // https://node-postgres.com/
 * db.provider.db().query(queryText:string, params:any[], function(err, rows, time, options) {
 *      // , где queryText - строка запроса, params - параметры
 *      if(!err) {
 *          // rows - результат выполнения, time - время запроса в милисекундах, options - дополнительные данные
 *      } else {
 *          console.log(err);
 *      }
 * }); 
 */
exports.provider = provider;

/**
 * Действия пользователя
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      c_app_name:text - Имя приложение
 *      c_data:text - Дополнительные параметры
 *      c_type:text - Тип события
 *      d_date:timestamp with time zone - Дата события
 *      dx_created:timestamp with time zone - Дата создания в БД
 *      fn_user:integer (core.pd_users.id) - Пользователь
 *      id:bigint - Идентификатор
 * // примеры выборки
 * [{ action: "ad_audits", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_ad_audits", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "ad_audits", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "ad_audits", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "ad_audits", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "ad_audits", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "ad_audits", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.ad_audits = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('ad_audits', 'QUERY', 'id', query_param, session);
            provider.select('core', 'ad_audits', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('ad_audits', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_ad_audits()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'ad_audits', data, function() {
                onQueryListener('ad_audits', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'ad_audits', 'id', data, function() {
                onQueryListener('ad_audits', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'ad_audits', 'id', data, function() {
                onQueryListener('ad_audits', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'ad_audits', 'id', data, function() {
                onQueryListener('ad_audits', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('ad_audits', 'COUNT', 'id', query_param, session);
            provider.count('core', 'ad_audits', query_param, callback);
        }
    }
}

/**
 * Информация о мобильных устройствах
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_debug:boolean - Режим отладки
 *      c_architecture:text - Архитектура устройства
 *      c_imei:text - IMEI
 *      c_os:text - Версия ОС
 *      c_phone_model:text - Модель телефона
 *      c_sdk:text - Версия sdk
 *      c_version:text - Версия приложения
 *      d_date:timestamp with time zone - Дата возникновения событий
 *      dx_created:timestamp with time zone - Создан в БД
 *      fn_user:integer (core.pd_users.id) - Пользователь
 *      id:uuid - Идентификатор
 *      n_version:bigint - n_version
 * // примеры выборки
 * [{ action: "ad_mobile_devices", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_ad_mobile_devices", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "ad_mobile_devices", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "ad_mobile_devices", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "ad_mobile_devices", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "ad_mobile_devices", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "ad_mobile_devices", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.ad_mobile_devices = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('ad_mobile_devices', 'QUERY', 'id', query_param, session);
            provider.select('core', 'ad_mobile_devices', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('ad_mobile_devices', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_ad_mobile_devices()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'ad_mobile_devices', data, function() {
                onQueryListener('ad_mobile_devices', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'ad_mobile_devices', 'id', data, function() {
                onQueryListener('ad_mobile_devices', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'ad_mobile_devices', 'id', data, function() {
                onQueryListener('ad_mobile_devices', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'ad_mobile_devices', 'id', data, function() {
                onQueryListener('ad_mobile_devices', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('ad_mobile_devices', 'COUNT', 'id', query_param, session);
            provider.count('core', 'ad_mobile_devices', query_param, callback);
        }
    }
}

/**
 * Показатели мобильного устройства
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_isonline:boolean - Состояние подключения к сети интернет
 *      c_network_type:text - Тип сети
 *      d_date:timestamp with time zone - Дата события
 *      dx_created:timestamp with time zone - Создан в БД
 *      fn_user:integer (core.pd_users.id) - Пользователь
 *      id:uuid - Идентификатор
 *      n_battery_level:integer - Уровень заряда батареи
 *      n_phone_memory:bigint - Размер внутренней памяти
 *      n_ram:bigint - Размер ОЗУ
 *      n_sd_card_memory:bigint - Размер внешней памяти
 *      n_time:integer - Смещение времени
 *      n_used_phone_memory:bigint - Размер используемой внутренней памяти
 *      n_used_ram:bigint - Размер используемого ОЗУ
 *      n_used_sd_card_memory:bigint - Размер используемой внешей памяти
 * // примеры выборки
 * [{ action: "ad_mobile_indicators", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_ad_mobile_indicators", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "ad_mobile_indicators", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "ad_mobile_indicators", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "ad_mobile_indicators", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "ad_mobile_indicators", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "ad_mobile_indicators", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.ad_mobile_indicators = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('ad_mobile_indicators', 'QUERY', 'id', query_param, session);
            provider.select('core', 'ad_mobile_indicators', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('ad_mobile_indicators', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_ad_mobile_indicators()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'ad_mobile_indicators', data, function() {
                onQueryListener('ad_mobile_indicators', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'ad_mobile_indicators', 'id', data, function() {
                onQueryListener('ad_mobile_indicators', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'ad_mobile_indicators', 'id', data, function() {
                onQueryListener('ad_mobile_indicators', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'ad_mobile_indicators', 'id', data, function() {
                onQueryListener('ad_mobile_indicators', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('ad_mobile_indicators', 'COUNT', 'id', query_param, session);
            provider.count('core', 'ad_mobile_indicators', query_param, callback);
        }
    }
}

/**
 * Перемещение исполнителя
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      c_network_status:text - Тип сети
 *      d_date:timestamp with time zone - Дата
 *      dx_created:timestamp with time zone - Создан в БД
 *      fn_user:integer (core.pd_users.id) - Исполнитель
 *      id:uuid - Идентификатор
 *      n_latitude:numeric - Широта
 *      n_longitude:numeric - Долгота
 * // примеры выборки
 * [{ action: "ad_tracking", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_ad_tracking", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "ad_tracking", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "ad_tracking", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "ad_tracking", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "ad_tracking", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "ad_tracking", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.ad_tracking = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('ad_tracking', 'QUERY', 'id', query_param, session);
            provider.select('core', 'ad_tracking', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('ad_tracking', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_ad_tracking()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'ad_tracking', data, function() {
                onQueryListener('ad_tracking', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'ad_tracking', 'id', data, function() {
                onQueryListener('ad_tracking', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'ad_tracking', 'id', data, function() {
                onQueryListener('ad_tracking', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'ad_tracking', 'id', data, function() {
                onQueryListener('ad_tracking', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('ad_tracking', 'COUNT', 'id', query_param, session);
            provider.count('core', 'ad_tracking', query_param, callback);
        }
    }
}

/**
 * Логирование запросов пользователя
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      c_action:text - Имя таблицы
 *      c_method:text - Метод
 *      d_date:timestamp with time zone - d_date
 *      f_user:integer (core.pd_users.id) - Пользователь
 *      id:uuid - id
 *      integer_id:bigint - Идентификатор
 *      jb_data:jsonb - jb_data
 *      uuid_id:uuid - Идентификатор
 * // примеры выборки
 * [{ action: "cd_action_log_user", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_action_log_user", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_action_log_user", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_action_log_user", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_action_log_user", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_action_log_user", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_action_log_user", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_action_log_user = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_action_log_user', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_action_log_user', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_action_log_user', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_action_log_user()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_action_log_user', data, function() {
                onQueryListener('cd_action_log_user', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_action_log_user', 'id', data, function() {
                onQueryListener('cd_action_log_user', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_action_log_user', 'id', data, function() {
                onQueryListener('cd_action_log_user', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_action_log_user', 'id', data, function() {
                onQueryListener('cd_action_log_user', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_action_log_user', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_action_log_user', query_param, callback);
        }
    }
}

/**
 * Файлы
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      ba_data:bytea - Превью
 *      c_notice:text - Примечание
 *      d_date:timestamp with time zone - Дата создания
 *      dx_created:timestamp with time zone - Дата создания в БД
 *      fn_file:uuid (core.cd_files.id) - Файл
 *      fn_point:uuid - fn_point
 *      fn_result:uuid (core.cd_results.id) - Результат
 *      fn_route:uuid - Маршрут
 *      fn_type:integer (core.cs_attachment_types.id) - Тип изображения
 *      fn_user:integer - fn_user
 *      id:uuid - Идентификатор
 *      jb_data:jsonb - JSON данные
 *      n_latitude:numeric - Широта
 *      n_longitude:numeric - Долгота
 *      n_size:integer - Размер превью
 * // примеры выборки
 * [{ action: "cd_attachments", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_attachments", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_attachments", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_attachments", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_attachments", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_attachments", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_attachments", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_attachments = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_attachments', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_attachments', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_attachments', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_attachments()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_attachments', data, function() {
                onQueryListener('cd_attachments', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_attachments', 'id', data, function() {
                onQueryListener('cd_attachments', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_attachments', 'id', data, function() {
                onQueryListener('cd_attachments', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_attachments', 'id', data, function() {
                onQueryListener('cd_attachments', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_attachments', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_attachments', query_param, callback);
        }
    }
}

/**
 * Файлы
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      ba_data:bytea - Байты
 *      c_extension:text - Расширение
 *      c_mime:text - MIME-тип
 *      c_name:text - Имя файла
 *      d_date:timestamp with time zone - Дата создания
 *      dx_created:timestamp with time zone - Дата создания в БД
 *      fn_user:integer - fn_user
 *      id:uuid - Идентификатор
 *      jb_data:jsonb - JSON данные
 *      n_size:integer - Размер файла
 * // примеры выборки
 * [{ action: "cd_files", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_files", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_files", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_files", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_files", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_files", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_files", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_files = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_files', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_files', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_files', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_files()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_files', data, function() {
                onQueryListener('cd_files', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_files', 'id', data, function() {
                onQueryListener('cd_files', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_files', 'id', data, function() {
                onQueryListener('cd_files', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_files', 'id', data, function() {
                onQueryListener('cd_files', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_files', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_files', query_param, callback);
        }
    }
}

/**
 * Уведомления
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_readed:boolean - Прочитан
 *      b_sended:boolean - Доставлено
 *      c_group:text - c_group
 *      c_message:text - Сообщение
 *      c_title:text - Заголовок
 *      d_changed:timestamp with time zone - Изменен
 *      d_date:timestamp with time zone - Создан
 *      dx_created:timestamp with time zone - Дата создания в БД
 *      fn_user_from:integer (core.pd_users.id) - От кого
 *      fn_user_to:integer (core.pd_users.id) - Адресат
 *      id:uuid - id
 *      jb_data:jsonb - Дополнительные данные в уведомлениях
 * // примеры выборки
 * [{ action: "cd_notifications", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_notifications", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_notifications", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_notifications", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_notifications", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_notifications", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_notifications", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_notifications = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_notifications', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_notifications', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_notifications', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_notifications()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_notifications', data, function() {
                onQueryListener('cd_notifications', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_notifications', 'id', data, function() {
                onQueryListener('cd_notifications', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_notifications', 'id', data, function() {
                onQueryListener('cd_notifications', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_notifications', 'id', data, function() {
                onQueryListener('cd_notifications', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_notifications', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_notifications', query_param, callback);
        }
    }
}

/**
 * Лояльное население
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: dbo
 * Поля:
 *      c_first_name:text - Имя
 *      c_last_name:text - Фамилия
 *      c_middle_name:text - Отчество
 *      c_org:text - Наименование организации
 *      c_phone:text - Номер телефона
 *      dx_created:timestamp with time zone - dx_created
 *      f_appartament:uuid (dbo.cs_appartament.id) - Помещение, Квартира
 *      f_imp_id:integer - иден. для импорта
 *      f_type:integer (dbo.cs_people_types.id) - Тип записи
 *      f_user:integer - Пользователь
 *      id:uuid - id
 *      n_birth_year:integer - Год рождения
 * // примеры выборки
 * [{ action: "cd_people", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_people", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_people", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_people", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_people", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_people", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_people", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_people = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_people', 'QUERY', 'id', query_param, session);
            provider.select('dbo', 'cd_people', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_people', 'SELECT', 'id', query_param, session);
            provider.select('dbo', 'cf_mui_cd_people()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('dbo', 'cd_people', data, function() {
                onQueryListener('cd_people', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('dbo', 'cd_people', 'id', data, function() {
                onQueryListener('cd_people', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('dbo', 'cd_people', 'id', data, function() {
                onQueryListener('cd_people', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('dbo', 'cd_people', 'id', data, function() {
                onQueryListener('cd_people', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_people', 'COUNT', 'id', query_param, session);
            provider.count('dbo', 'cd_people', query_param, callback);
        }
    }
}

/**
 * Точки
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_anomaly:boolean - b_anomaly
 *      c_info:text - Информация
 *      c_short_info:text - Краткое описание для задания
 *      dx_created:timestamp with time zone - Дата создания в БД
 *      f_appartament:uuid - Квартира
 *      f_route:uuid (core.cd_routes.id) - Маршрут
 *      f_type:integer (core.cs_point_types.id) - Тип точки
 *      id:uuid - Идентификатор
 *      jb_data:jsonb - JSON данные
 *      n_order:integer - Сортировка
 *      sn_delete:boolean - sn_delete
 * // примеры выборки
 * [{ action: "cd_points", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_points", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_points", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_points", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_points", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_points", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_points", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_points = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_points', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_points', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_points', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_points()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_points', data, function() {
                onQueryListener('cd_points', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_points', 'id', data, function() {
                onQueryListener('cd_points', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_points', 'id', data, function() {
                onQueryListener('cd_points', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_points', 'id', data, function() {
                onQueryListener('cd_points', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_points', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_points', query_param, callback);
        }
    }
}

/**
 * Результат выполнения
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_disabled:boolean - b_disabled
 *      b_warning:boolean - Предупреждение Дост./Недост.
 *      c_notice:text - Примечание
 *      d_date:timestamp with time zone - Дата создания
 *      dx_created:timestamp with time zone - Дата создания в БД
 *      fn_point:uuid - Точка маршрута
 *      fn_route:uuid - Маршрут
 *      fn_type:integer (core.cs_result_types.id) - Тип результат
 *      fn_user:integer (core.pd_users.id) - Пользователь
 *      fn_user_point:uuid (core.cd_user_points.id) - Пользовательская точка
 *      id:uuid - Идентификатор
 *      jb_answers:jsonb - Ответы на вопросы
 *      jb_data:jsonb - JSON данные
 * // примеры выборки
 * [{ action: "cd_results", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_results", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_results", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_results", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_results", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_results", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_results", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_results = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_results', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_results', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_results', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_results()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_results', data, function() {
                onQueryListener('cd_results', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_results', 'id', data, function() {
                onQueryListener('cd_results', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_results', 'id', data, function() {
                onQueryListener('cd_results', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_results', 'id', data, function() {
                onQueryListener('cd_results', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_results', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_results', query_param, callback);
        }
    }
}

/**
 * Маршруты
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_draft:boolean - Является черновиком
 *      b_extended:boolean - Продлен
 *      c_address:text - Номер маршрута
 *      c_info:text - Примечание
 *      d_date:timestamp with time zone - Дата создания
 *      d_date_end:date - Дата завершения выполнения
 *      d_date_start:date - Дата начала выполнения
 *      d_extended:date - Продлен до
 *      dx_created:timestamp with time zone - Дата создания в БД
 *      f_house:uuid - f_house
 *      f_type:integer (core.cs_route_types.id) - Тип маршрута
 *      id:uuid - Идентификатор
 *      jb_data:jsonb - JSON данные
 *      n_order:integer - Сортировка
 * // примеры выборки
 * [{ action: "cd_routes", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_routes", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_routes", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_routes", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_routes", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_routes", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_routes", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_routes = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_routes', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_routes', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_routes', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_routes()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_routes', data, function() {
                onQueryListener('cd_routes', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_routes', 'id', data, function() {
                onQueryListener('cd_routes', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_routes', 'id', data, function() {
                onQueryListener('cd_routes', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_routes', 'id', data, function() {
                onQueryListener('cd_routes', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_routes', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_routes', query_param, callback);
        }
    }
}

/**
 * История изменения статусов заданий
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      c_notice:text - Примечание
 *      d_date:timestamp with time zone - Дата изменения
 *      dx_created:timestamp with time zone - Дата создания в БД
 *      fn_route:uuid (core.cd_routes.id) - Задание
 *      fn_status:integer (core.cs_route_statuses.id) - Статус
 *      fn_user:integer (core.pd_users.id) - Пользователь
 *      id:uuid - Идентификатор
 * // примеры выборки
 * [{ action: "cd_route_history", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_route_history", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_route_history", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_route_history", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_route_history", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_route_history", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_route_history", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_route_history = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_route_history', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_route_history', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_route_history', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_route_history()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_route_history', data, function() {
                onQueryListener('cd_route_history', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_route_history', 'id', data, function() {
                onQueryListener('cd_route_history', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_route_history', 'id', data, function() {
                onQueryListener('cd_route_history', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_route_history', 'id', data, function() {
                onQueryListener('cd_route_history', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_route_history', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_route_history', query_param, callback);
        }
    }
}

/**
 * Настройки
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      c_key:text - Ключ
 *      c_label:text - Заголовок
 *      c_summary:text - Краткое описание
 *      c_value:text - Значение
 *      f_division:integer (core.sd_divisions.id) - Регион
 *      f_role:integer - f_role
 *      f_type:integer (core.cs_setting_types.id) - Тип
 *      f_user:integer (core.pd_users.id) - Пользователь
 *      id:integer - Идентификатор
 *      sn_delete:boolean - Удален
 * // примеры выборки
 * [{ action: "cd_settings", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_settings", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_settings", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_settings", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_settings", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_settings", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_settings", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_settings = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_settings', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_settings', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_settings', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_settings()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_settings', data, function() {
                onQueryListener('cd_settings', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_settings', 'id', data, function() {
                onQueryListener('cd_settings', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_settings', 'id', data, function() {
                onQueryListener('cd_settings', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_settings', 'id', data, function() {
                onQueryListener('cd_settings', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_settings', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_settings', query_param, callback);
        }
    }
}

/**
 * Результат голосования 2018
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: dbo
 * Поля:
 *      d_date:date - d_date
 *      f_appartament:uuid (dbo.cs_appartament.id) - f_appartament
 *      f_friend_type:smallint (dbo.sf_friend_types.id) - Тип лояльности
 *      id:integer - id
 *      n_signature:smallint - n_signature
 * // примеры выборки
 * [{ action: "cd_signature_2018", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_signature_2018", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_signature_2018", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_signature_2018", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_signature_2018", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_signature_2018", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_signature_2018", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_signature_2018 = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_signature_2018', 'QUERY', 'id', query_param, session);
            provider.select('dbo', 'cd_signature_2018', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_signature_2018', 'SELECT', 'id', query_param, session);
            provider.select('dbo', 'cf_mui_cd_signature_2018()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('dbo', 'cd_signature_2018', data, function() {
                onQueryListener('cd_signature_2018', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('dbo', 'cd_signature_2018', 'id', data, function() {
                onQueryListener('cd_signature_2018', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('dbo', 'cd_signature_2018', 'id', data, function() {
                onQueryListener('cd_signature_2018', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('dbo', 'cd_signature_2018', 'id', data, function() {
                onQueryListener('cd_signature_2018', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_signature_2018', 'COUNT', 'id', query_param, session);
            provider.count('dbo', 'cd_signature_2018', query_param, callback);
        }
    }
}

/**
 *  Логирование job
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      c_descr:text - c_descr
 *      d_timestamp:timestamp with time zone - d_timestamp
 *      id:uuid - id
 *      n_level_msg:integer - 0 - сообщение1 - предупрежденние2 - ошибка
 * // примеры выборки
 * [{ action: "cd_sys_log", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_sys_log", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_sys_log", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_sys_log", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_sys_log", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_sys_log", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_sys_log", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_sys_log = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_sys_log', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_sys_log', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_sys_log', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_sys_log()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_sys_log', data, function() {
                onQueryListener('cd_sys_log', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_sys_log', 'id', data, function() {
                onQueryListener('cd_sys_log', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_sys_log', 'id', data, function() {
                onQueryListener('cd_sys_log', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_sys_log', 'id', data, function() {
                onQueryListener('cd_sys_log', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_sys_log', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_sys_log', query_param, callback);
        }
    }
}

/**
 * УИК
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: dbo
 * Поля:
 *      c_email:text - Email
 *      c_fio:text - ФИО
 *      c_job:text - c_job
 *      c_phone:text - c_phone
 *      c_place:text - указывается адрес и место голосования
 *      c_place_phone:text - указываются телефоны УИКа
 *      c_work_place:text - c_work_place
 *      id:integer - Идентификатор
 * // примеры выборки
 * [{ action: "cd_uik", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_uik", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_uik", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_uik", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_uik", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_uik", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_uik", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_uik = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_uik', 'QUERY', 'id', query_param, session);
            provider.select('dbo', 'cd_uik', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_uik', 'SELECT', 'id', query_param, session);
            provider.select('dbo', 'cf_mui_cd_uik()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('dbo', 'cd_uik', data, function() {
                onQueryListener('cd_uik', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('dbo', 'cd_uik', 'id', data, function() {
                onQueryListener('cd_uik', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('dbo', 'cd_uik', 'id', data, function() {
                onQueryListener('cd_uik', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('dbo', 'cd_uik', 'id', data, function() {
                onQueryListener('cd_uik', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_uik', 'COUNT', 'id', query_param, session);
            provider.count('dbo', 'cd_uik', query_param, callback);
        }
    }
}

/**
 * Исполнители задания
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_main:boolean - Является главным
 *      dx_created:timestamp with time zone - Дата создания в БД
 *      f_route:uuid (core.cd_routes.id) - Маршрут
 *      f_user:integer (core.pd_users.id) - Пользователь
 *      id:uuid - Идентифиактор
 * // примеры выборки
 * [{ action: "cd_userinroutes", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_userinroutes", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_userinroutes", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_userinroutes", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_userinroutes", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_userinroutes", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_userinroutes", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_userinroutes = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_userinroutes', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_userinroutes', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_userinroutes', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_userinroutes()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_userinroutes', data, function() {
                onQueryListener('cd_userinroutes', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_userinroutes', 'id', data, function() {
                onQueryListener('cd_userinroutes', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_userinroutes', 'id', data, function() {
                onQueryListener('cd_userinroutes', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_userinroutes', 'id', data, function() {
                onQueryListener('cd_userinroutes', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_userinroutes', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_userinroutes', query_param, callback);
        }
    }
}

/**
 * Точки
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_check:boolean - Подтверждено
 *      b_disabled:boolean - b_disabled
 *      c_notice:text - Примечание
 *      d_date:timestamp with time zone - Дата создания
 *      d_date_check:timestamp with time zone - Дата подтверждения
 *      dx_created:timestamp with time zone - Дата записи в БД
 *      fn_point:uuid (core.cd_points.id) - Точка
 *      fn_route:uuid (core.cd_routes.id) - Маршрут
 *      fn_type:integer (core.cs_point_types.id) - Тип
 *      fn_user:integer (core.pd_users.id) - Пользователь
 *      id:uuid - Идентификатор
 *      jb_data:jsonb - JSON данные
 *      n_latitude:numeric - Широта
 *      n_longitude:numeric - Долгота
 * // примеры выборки
 * [{ action: "cd_user_points", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_user_points", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cd_user_points", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cd_user_points", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cd_user_points", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cd_user_points", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cd_user_points", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cd_user_points = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cd_user_points', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cd_user_points', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cd_user_points', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cd_user_points()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cd_user_points', data, function() {
                onQueryListener('cd_user_points', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cd_user_points', 'id', data, function() {
                onQueryListener('cd_user_points', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cd_user_points', 'id', data, function() {
                onQueryListener('cd_user_points', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cd_user_points', 'id', data, function() {
                onQueryListener('cd_user_points', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cd_user_points', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cd_user_points', query_param, callback);
        }
    }
}

/**
 * Триггер. Изменение уведомления
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cft_cd_notification_update", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cft_cd_notification_update = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cft_cd_notification_update', query_param.params, function() {
                onQueryListener('cft_cd_notification_update', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Триггер. Обновление числового номера дома
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cft_cs_house_number_update", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cft_cs_house_number_update = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cft_cs_house_number_update', query_param.params, function() {
                onQueryListener('cft_cs_house_number_update', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Триггер. Обновление дома
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cft_cs_house_update", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cft_cs_house_update = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cft_cs_house_update', query_param.params, function() {
                onQueryListener('cft_cs_house_update', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Триггер. Процедура логирования действия пользователя
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cft_log_action", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cft_log_action = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cft_log_action', query_param.params, function() {
                onQueryListener('cft_log_action', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Триггер. Обновление версии в пользователях
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cft_pd_users_update_version", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cft_pd_users_update_version = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cft_pd_users_update_version', query_param.params, function() {
                onQueryListener('cft_pd_users_update_version', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Триггер. Обновления версии приложения
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cft_sd_digest_update_version", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cft_sd_digest_update_version = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cft_sd_digest_update_version', query_param.params, function() {
                onQueryListener('cft_sd_digest_update_version', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Триггер. Обновление справочной версии
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cft_table_state_change_version", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cft_table_state_change_version = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cft_table_state_change_version', query_param.params, function() {
                onQueryListener('cft_table_state_change_version', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Обновление Филиала/Отделения/Участка у пользователя
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_add_user_divisions", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_add_user_divisions = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_add_user_divisions', query_param.params, function() {
                onQueryListener('cf_add_user_divisions', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Функция предназначена для назначения или переназначения исполнителей в маршруте
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_assign_route", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_assign_route = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_assign_route', query_param.params, function() {
                onQueryListener('cf_arm_assign_route', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение всех точек заданий, по значениям, выбранным в фильтре за текущий день
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_cd_points", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_arm_cd_points", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_cd_points = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_cd_points', query_param.params, function() {
                onQueryListener('cf_arm_cd_points', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_arm_cd_points()', query_param, filter.security(session), function() {
                onQueryListener('cf_arm_cd_points', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Подсветка дат с выполненными заданиями
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_cd_results", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_arm_cd_results", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_cd_results = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_cd_results', query_param.params, function() {
                onQueryListener('cf_arm_cd_results', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_arm_cd_results()', query_param, filter.security(session), function() {
                onQueryListener('cf_arm_cd_results', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Список маршрутов в разделе &amp;#34;Маршруты&amp;#34; - для отчетности
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_cd_routes", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_arm_cd_routes", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_cd_routes = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_cd_routes', query_param.params, function() {
                onQueryListener('cf_arm_cd_routes', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_arm_cd_routes()', query_param, filter.security(session), function() {
                onQueryListener('cf_arm_cd_routes', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Создание маршрута на основе точек учета
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_create_route", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_arm_create_route", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_create_route = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_create_route', query_param.params, function() {
                onQueryListener('cf_arm_create_route', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_arm_create_route()', query_param, filter.security(session), function() {
                onQueryListener('cf_arm_create_route', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * 
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_filtration", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_arm_filtration", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_filtration = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_filtration', query_param.params, function() {
                onQueryListener('cf_arm_filtration', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_arm_filtration()', query_param, filter.security(session), function() {
                onQueryListener('cf_arm_filtration', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение пользователей по заданному фильтру
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_pd_users", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_arm_pd_users", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_pd_users = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_pd_users', query_param.params, function() {
                onQueryListener('cf_arm_pd_users', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_arm_pd_users()', query_param, filter.security(session), function() {
                onQueryListener('cf_arm_pd_users', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение статистика для обходчиков по заданному фильтру
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_pd_users_stat", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_arm_pd_users_stat", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_pd_users_stat = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_pd_users_stat', query_param.params, function() {
                onQueryListener('cf_arm_pd_users_stat', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_arm_pd_users_stat()', query_param, filter.security(session), function() {
                onQueryListener('cf_arm_pd_users_stat', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение статистик по обходчику
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_pd_user_stat", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_arm_pd_user_stat", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_pd_user_stat = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_pd_user_stat', query_param.params, function() {
                onQueryListener('cf_arm_pd_user_stat', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_arm_pd_user_stat()', query_param, filter.security(session), function() {
                onQueryListener('cf_arm_pd_user_stat', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Удаление маршрута со статусом &amp;#34;Сформирован&amp;#34;
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_remove_route", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_remove_route = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_remove_route', query_param.params, function() {
                onQueryListener('cf_arm_remove_route', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * 
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_route_details", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_arm_route_details", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_route_details = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_route_details', query_param.params, function() {
                onQueryListener('cf_arm_route_details', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_arm_route_details()', query_param, filter.security(session), function() {
                onQueryListener('cf_arm_route_details', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Передача маршрута на исполнение
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_transfer_route", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_transfer_route = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_transfer_route', query_param.params, function() {
                onQueryListener('cf_arm_transfer_route', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Обновление точек маршрута на основе точек учета
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_arm_update_route", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_arm_update_route = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_arm_update_route', query_param.params, function() {
                onQueryListener('cf_arm_update_route', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Обновление статуса проверки
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_bss_check_appartament_update", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_bss_check_appartament_update = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_bss_check_appartament_update', query_param.params, function() {
                onQueryListener('cf_bss_check_appartament_update', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение квартир, которые доступны определенному пользователю
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_bss_cs_appartament", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_bss_cs_appartament", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_bss_cs_appartament = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_bss_cs_appartament', query_param.params, function() {
                onQueryListener('cf_bss_cs_appartament', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_bss_cs_appartament()', query_param, filter.security(session), function() {
                onQueryListener('cf_bss_cs_appartament', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение информации по квартире
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_bss_cs_appartament_info", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_bss_cs_appartament_info", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_bss_cs_appartament_info = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_bss_cs_appartament_info', query_param.params, function() {
                onQueryListener('cf_bss_cs_appartament_info', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_bss_cs_appartament_info()', query_param, filter.security(session), function() {
                onQueryListener('cf_bss_cs_appartament_info', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Список домов для участия в госсовете
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_bss_cs_house", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_bss_cs_house", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_bss_cs_house = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_bss_cs_house', query_param.params, function() {
                onQueryListener('cf_bss_cs_house', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_bss_cs_house()', query_param, filter.security(session), function() {
                onQueryListener('cf_bss_cs_house', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Информация по дому в разрезе жильцов
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_bss_cs_house_info", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_bss_cs_house_info", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_bss_cs_house_info = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_bss_cs_house_info', query_param.params, function() {
                onQueryListener('cf_bss_cs_house_info', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_bss_cs_house_info()', query_param, filter.security(session), function() {
                onQueryListener('cf_bss_cs_house_info', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Информация о лояльности
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_bss_cs_house_loyalty", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_bss_cs_house_loyalty", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_bss_cs_house_loyalty = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_bss_cs_house_loyalty', query_param.params, function() {
                onQueryListener('cf_bss_cs_house_loyalty', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_bss_cs_house_loyalty()', query_param, filter.security(session), function() {
                onQueryListener('cf_bss_cs_house_loyalty', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка улиц, которые доступны определенному пользователю
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_bss_cs_street", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_bss_cs_street", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_bss_cs_street = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_bss_cs_street', query_param.params, function() {
                onQueryListener('cf_bss_cs_street', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_bss_cs_street()', query_param, filter.security(session), function() {
                onQueryListener('cf_bss_cs_street', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Проверка на наличие квартир
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_bss_is_appartament_exists", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_bss_is_appartament_exists", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_bss_is_appartament_exists = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_bss_is_appartament_exists', query_param.params, function() {
                onQueryListener('cf_bss_is_appartament_exists', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_bss_is_appartament_exists()', query_param, filter.security(session), function() {
                onQueryListener('cf_bss_is_appartament_exists', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Проверка на наличие дома
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_bss_is_house_exists", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_bss_is_house_exists", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_bss_is_house_exists = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_bss_is_house_exists', query_param.params, function() {
                onQueryListener('cf_bss_is_house_exists', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_bss_is_house_exists()', query_param, filter.security(session), function() {
                onQueryListener('cf_bss_is_house_exists', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Проверка на наличие улицы
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_bss_is_steet_exists", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_bss_is_steet_exists", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_bss_is_steet_exists = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_bss_is_steet_exists', query_param.params, function() {
                onQueryListener('cf_bss_is_steet_exists', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_bss_is_steet_exists()', query_param, filter.security(session), function() {
                onQueryListener('cf_bss_is_steet_exists', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка пользователей
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_bss_pd_users", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_bss_pd_users", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_bss_pd_users = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_bss_pd_users', query_param.params, function() {
                onQueryListener('cf_bss_pd_users', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_bss_pd_users()', query_param, filter.security(session), function() {
                onQueryListener('cf_bss_pd_users', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Завершение маршрута
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_finish_route", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_finish_route = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_finish_route', query_param.params, function() {
                onQueryListener('cf_finish_route', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Генерация маршрутов для агитаторов
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_imp_generate_routes", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_imp_generate_routes", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_imp_generate_routes = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_imp_generate_routes', query_param.params, function() {
                onQueryListener('cf_imp_generate_routes', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_imp_generate_routes()', query_param, filter.security(session), function() {
                onQueryListener('cf_imp_generate_routes', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение &amp;#34;Вложения&amp;#34; мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cd_attachment", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_attachment", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cd_attachment = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cd_attachment', query_param.params, function() {
                onQueryListener('cf_mui_cd_attachment', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cd_attachment()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cd_attachment', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка &amp;#34;Вложений&amp;#34; мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cd_attachments", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_attachments", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cd_attachments = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cd_attachments', query_param.params, function() {
                onQueryListener('cf_mui_cd_attachments', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cd_attachments()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cd_attachments', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка &amp;#34;Файлов&amp;#34; мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cd_files", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_files", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cd_files = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cd_files', query_param.params, function() {
                onQueryListener('cf_mui_cd_files', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cd_files()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cd_files', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка &amp;#34;Уведомлений&amp;#34; мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cd_notifications", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_notifications", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cd_notifications = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cd_notifications', query_param.params, function() {
                onQueryListener('cf_mui_cd_notifications', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cd_notifications()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cd_notifications', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка &amp;#34;Точек маршрута&amp;#34; мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cd_points", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_points", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cd_points = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cd_points', query_param.params, function() {
                onQueryListener('cf_mui_cd_points', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cd_points()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cd_points', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка &amp;#34;Результаты обхода&amp;#34; мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cd_results", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_results", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cd_results = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cd_results', query_param.params, function() {
                onQueryListener('cf_mui_cd_results', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cd_results()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cd_results', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка &amp;#34;Маршрутов&amp;#34; мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cd_routes", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_routes", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cd_routes = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cd_routes', query_param.params, function() {
                onQueryListener('cf_mui_cd_routes', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cd_routes()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cd_routes', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка &amp;#34;Истории маршрутов&amp;#34; мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cd_route_history", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_route_history", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cd_route_history = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cd_route_history', query_param.params, function() {
                onQueryListener('cf_mui_cd_route_history', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cd_route_history()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cd_route_history', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка &amp;#34;пользователей в маршрутах&amp;#34; мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cd_userinroutes", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_userinroutes", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cd_userinroutes = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cd_userinroutes', query_param.params, function() {
                onQueryListener('cf_mui_cd_userinroutes', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cd_userinroutes()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cd_userinroutes', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка &amp;#34;Пользовательских точек&amp;#34; мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cd_user_points", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cd_user_points", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cd_user_points = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cd_user_points', query_param.params, function() {
                onQueryListener('cf_mui_cd_user_points', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cd_user_points()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cd_user_points', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * 
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_mui_cs_answer", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_answer", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cs_answer = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_mui_cs_answer', query_param.params, function() {
                onQueryListener('cf_mui_cs_answer', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_mui_cs_answer()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cs_answer', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Типы вложений
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cs_attachment_types", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_attachment_types", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cs_attachment_types = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cs_attachment_types', query_param.params, function() {
                onQueryListener('cf_mui_cs_attachment_types', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cs_attachment_types()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cs_attachment_types', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Тип точки
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cs_point_types", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_point_types", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cs_point_types = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cs_point_types', query_param.params, function() {
                onQueryListener('cf_mui_cs_point_types', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cs_point_types()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cs_point_types', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * 
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_mui_cs_question", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_question", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cs_question = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_mui_cs_question', query_param.params, function() {
                onQueryListener('cf_mui_cs_question', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_mui_cs_question()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cs_question', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Тип результат
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cs_result_types", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_result_types", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cs_result_types = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cs_result_types', query_param.params, function() {
                onQueryListener('cf_mui_cs_result_types', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cs_result_types()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cs_result_types', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Тип результат
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cs_route_statuses", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_route_statuses", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cs_route_statuses = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cs_route_statuses', query_param.params, function() {
                onQueryListener('cf_mui_cs_route_statuses', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cs_route_statuses()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cs_route_statuses', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Тип маршрута
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_cs_route_types", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_route_types", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_cs_route_types = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_cs_route_types', query_param.params, function() {
                onQueryListener('cf_mui_cs_route_types', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_cs_route_types()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_cs_route_types', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка пользователей мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_pd_users", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_pd_users", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_pd_users = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_pd_users', query_param.params, function() {
                onQueryListener('cf_mui_pd_users', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_pd_users()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_pd_users', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка версий мобильным приложением
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_sd_digests", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_sd_digests", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_sd_digests = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_sd_digests', query_param.params, function() {
                onQueryListener('cf_mui_sd_digests', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_sd_digests()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_sd_digests', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение списка изменений для пользователя
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "cf_mui_sd_table_change", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_sd_table_change", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_mui_sd_table_change = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'cf_mui_sd_table_change', query_param.params, function() {
                onQueryListener('cf_mui_sd_table_change', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'cf_mui_sd_table_change()', query_param, filter.security(session), function() {
                onQueryListener('cf_mui_sd_table_change', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Привязка агитатор к квартирам
 * @example
 * Тип: FUNCTION
 * Схема: rpt 
 * // примеры выборки
 * [{ action: "cf_rpt_bind_user", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_rpt_bind_user", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_rpt_bind_user = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('rpt', 'cf_rpt_bind_user', query_param.params, function() {
                onQueryListener('cf_rpt_bind_user', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('rpt', 'cf_rpt_bind_user()', query_param, filter.security(session), function() {
                onQueryListener('cf_rpt_bind_user', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Временная функция для получения неизвестных домов
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_tmp_cs_house_unknow", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_tmp_cs_house_unknow", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_tmp_cs_house_unknow = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_tmp_cs_house_unknow', query_param.params, function() {
                onQueryListener('cf_tmp_cs_house_unknow', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_tmp_cs_house_unknow()', query_param, filter.security(session), function() {
                onQueryListener('cf_tmp_cs_house_unknow', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Получение истории изменения дома
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_tmp_cs_house_unknow_history", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_tmp_cs_house_unknow_history", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_tmp_cs_house_unknow_history = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_tmp_cs_house_unknow_history', query_param.params, function() {
                onQueryListener('cf_tmp_cs_house_unknow_history', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'cf_tmp_cs_house_unknow_history()', query_param, filter.security(session), function() {
                onQueryListener('cf_tmp_cs_house_unknow_history', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Обновление дома. Привязка УИК и Округа
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "cf_tmp_house_update", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_tmp_house_update = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'cf_tmp_house_update', query_param.params, function() {
                onQueryListener('cf_tmp_house_update', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Статистика по пользователю
 * @example
 * Тип: FUNCTION
 * Схема: rpt 
 * // примеры выборки
 * [{ action: "cf_user_statistic", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cf_user_statistic = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('rpt', 'cf_user_statistic', query_param.params, function() {
                onQueryListener('cf_user_statistic', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Речевой модуль
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: dbo
 * Поля:
 *      id:bigint - Идентификатор
 *      c_text:text - Текст
 *      f_question:integer (dbo.cs_question.id) - Вопрос
 *      f_next_question:integer (dbo.cs_question.id) - Следующий вопрос
 *      c_action:text - Действие
 *      n_order:integer - Сортировка
 *      b_disabled:boolean - Отключить
 *      dx_created:timestamp with time zone - Дата создания
 *      sn_delete:boolean - Признак удаленной записи
 *      c_const:text - Константа ответа, можно использовать и c_color
 *      f_role:integer (core.pd_roles.id) - Конкретно для указанной роли
 * // примеры выборки
 * [{ action: "cs_answer", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_answer", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_answer", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_answer", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_answer", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_answer", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_answer", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_answer = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_answer', 'QUERY', 'id', query_param, session);
            provider.select('dbo', 'cs_answer', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_answer', 'SELECT', 'id', query_param, session);
            provider.select('dbo', 'cf_mui_cs_answer()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('dbo', 'cs_answer', data, function() {
                onQueryListener('cs_answer', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('dbo', 'cs_answer', 'id', data, function() {
                onQueryListener('cs_answer', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('dbo', 'cs_answer', 'id', data, function() {
                onQueryListener('cs_answer', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('dbo', 'cs_answer', 'id', data, function() {
                onQueryListener('cs_answer', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_answer', 'COUNT', 'id', query_param, session);
            provider.count('dbo', 'cs_answer', query_param, callback);
        }
    }
}

/**
 * Квартиры
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: dbo
 * Поля:
 *      b_check:boolean - b_check
 *      b_disabled:boolean - b_disabled
 *      b_off_range:boolean - Вне диапазона квартир
 *      c_notice:text - c_notice
 *      c_number:text - Строковый номер
 *      dx_date:timestamp with time zone - dx_date
 *      f_created_user:integer (core.pd_users.id) - f_created_user
 *      f_house:uuid (dbo.cs_house.id) - Дом
 *      f_user:integer (core.pd_users.id) - Агитатор
 *      id:uuid - Идентификатор
 *      jkh_premise_link:integer - Идентификатор квартиры из ГИС ЖКХ
 *      n_number:integer - Номер
 * // примеры выборки
 * [{ action: "cs_appartament", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_appartament", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_appartament", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_appartament", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_appartament", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_appartament", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_appartament", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_appartament = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_appartament', 'QUERY', 'id', query_param, session);
            provider.select('dbo', 'cs_appartament', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_appartament', 'SELECT', 'id', query_param, session);
            provider.select('dbo', 'cf_mui_cs_appartament()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('dbo', 'cs_appartament', data, function() {
                onQueryListener('cs_appartament', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('dbo', 'cs_appartament', 'id', data, function() {
                onQueryListener('cs_appartament', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('dbo', 'cs_appartament', 'id', data, function() {
                onQueryListener('cs_appartament', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('dbo', 'cs_appartament', 'id', data, function() {
                onQueryListener('cs_appartament', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_appartament', 'COUNT', 'id', query_param, session);
            provider.count('dbo', 'cs_appartament', query_param, callback);
        }
    }
}

/**
 * Тип изображений
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_default:boolean - По умолчанию
 *      b_disabled:boolean - Отключено
 *      c_const:text - Константа
 *      c_name:text - Наименование
 *      c_short_name:text - Краткое наименование
 *      id:integer - Идентификатор
 *      n_code:integer - Код
 *      n_order:integer - Сортировка
 * // примеры выборки
 * [{ action: "cs_attachment_types", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_attachment_types", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_attachment_types", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_attachment_types", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_attachment_types", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_attachment_types", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_attachment_types", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_attachment_types = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_attachment_types', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cs_attachment_types', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_attachment_types', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cs_attachment_types()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cs_attachment_types', data, function() {
                onQueryListener('cs_attachment_types', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cs_attachment_types', 'id', data, function() {
                onQueryListener('cs_attachment_types', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cs_attachment_types', 'id', data, function() {
                onQueryListener('cs_attachment_types', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cs_attachment_types', 'id', data, function() {
                onQueryListener('cs_attachment_types', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_attachment_types', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cs_attachment_types', query_param, callback);
        }
    }
}

/**
 * Улицы
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: dbo
 * Поля:
 *      b_check:boolean - b_check
 *      b_disabled:boolean - b_disabled
 *      b_energo:boolean - b_energo
 *      b_tmp_kalinin:boolean - Относится к калининскому району
 *      b_tmp_lenin:boolean - Относится к ленинскому району
 *      b_tmp_moscow:boolean - Относится к московскому району
 *      b_tmp_nov:boolean - b_tmp_nov
 *      b_tmp_unknow:boolean - Неизвестна привязка
 *      c_entrance_count:text - кол-во подъездов
 *      c_full_number:text - Полный номер дома
 *      c_house_corp:text - корпус
 *      c_house_litera:text - литерала
 *      c_house_number:text - c_house_number
 *      c_notice:text - c_notice
 *      dx_date:timestamp with time zone - dx_date
 *      dx_tmp_modified:timestamp with time zone - Дата внесения изменения
 *      f_candidate_users:jsonb - Кандидаты
 *      f_street:uuid (dbo.cs_street.id) - Улица
 *      f_subdivision:integer (core.sd_subdivisions.id) - f_subdivision
 *      f_user:integer (core.pd_users.id) - f_user
 *      id:uuid - Идентификатор
 *      jkh_house_link:integer - Идентификатор дома в ГИС ЖКХ
 *      n_appart_count:smallint - кол-во квартир
 *      n_building_year:smallint - год строения
 *      n_count_floor_max:text - макс. кол-во этажей
 *      n_count_floor_min:text - мин. кол-во этажей
 *      n_gos_subdivision:integer - Номер округа при голосовании в госсовет
 *      n_latitude:numeric - широта
 *      n_lift_count:smallint - количество лифтов
 *      n_longitude:numeric - долгота
 *      n_number:integer - Числовой номер дома
 *      n_tmp_appart_count:bigint - Временная колонка. Количество квартир по дому
 *      n_uik:integer - n_uik
 *      s_fias_guid:uuid - ФИАС
 * // примеры выборки
 * [{ action: "cs_house", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_house", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_house", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_house", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_house", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_house", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_house", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_house = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_house', 'QUERY', 'id', query_param, session);
            provider.select('dbo', 'cs_house', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_house', 'SELECT', 'id', query_param, session);
            provider.select('dbo', 'cf_mui_cs_house()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('dbo', 'cs_house', data, function() {
                onQueryListener('cs_house', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('dbo', 'cs_house', 'id', data, function() {
                onQueryListener('cs_house', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('dbo', 'cs_house', 'id', data, function() {
                onQueryListener('cs_house', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('dbo', 'cs_house', 'id', data, function() {
                onQueryListener('cs_house', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_house', 'COUNT', 'id', query_param, session);
            provider.count('dbo', 'cs_house', query_param, callback);
        }
    }
}

/**
 * Тип маршрута
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: dbo
 * Поля:
 *      id:integer - Идентификатор
 *      n_code:integer - Код
 *      c_name:text - Наименование
 *      c_short_name:text - Краткое наименование
 *      c_const:text - Константа
 *      n_order:integer - Сортировка
 *      b_default:boolean - По умолчанию
 *      b_disabled:boolean - Отключено
 * // примеры выборки
 * [{ action: "cs_people_types", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_people_types", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_people_types", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_people_types", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_people_types", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_people_types", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_people_types", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_people_types = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_people_types', 'QUERY', 'id', query_param, session);
            provider.select('dbo', 'cs_people_types', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_people_types', 'SELECT', 'id', query_param, session);
            provider.select('dbo', 'cf_mui_cs_people_types()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('dbo', 'cs_people_types', data, function() {
                onQueryListener('cs_people_types', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('dbo', 'cs_people_types', 'id', data, function() {
                onQueryListener('cs_people_types', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('dbo', 'cs_people_types', 'id', data, function() {
                onQueryListener('cs_people_types', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('dbo', 'cs_people_types', 'id', data, function() {
                onQueryListener('cs_people_types', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_people_types', 'COUNT', 'id', query_param, session);
            provider.count('dbo', 'cs_people_types', query_param, callback);
        }
    }
}

/**
 * Тип точки
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_default:boolean - Отключено
 *      b_disabled:boolean - Отключено
 *      c_const:text - Константа
 *      c_name:text - Наименование
 *      c_short_name:text - Краткое наименование
 *      id:integer - Идентификатор
 *      n_code:integer - Код
 *      n_order:integer - Сортировка
 * // примеры выборки
 * [{ action: "cs_point_types", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_point_types", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_point_types", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_point_types", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_point_types", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_point_types", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_point_types", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_point_types = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_point_types', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cs_point_types', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_point_types', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cs_point_types()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cs_point_types', data, function() {
                onQueryListener('cs_point_types', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cs_point_types', 'id', data, function() {
                onQueryListener('cs_point_types', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cs_point_types', 'id', data, function() {
                onQueryListener('cs_point_types', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cs_point_types', 'id', data, function() {
                onQueryListener('cs_point_types', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_point_types', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cs_point_types', query_param, callback);
        }
    }
}

/**
 * Речевой модуль
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: dbo
 * Поля:
 *      id:bigint - Идентификатор
 *      c_title:text - Заголовок
 *      c_description:text - Описание
 *      c_text:text - Текст
 *      n_order:integer - Сортировка
 *      b_disabled:boolean - Отключить
 *      dx_created:timestamp with time zone - Дата создания
 *      sn_delete:boolean - Признак удаленной записи
 *      f_role:integer (core.pd_roles.id) - Конкретно для указанной роли
 *      n_priority:integer - n_priority
 * // примеры выборки
 * [{ action: "cs_question", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_question", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_question", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_question", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_question", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_question", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_question", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_question = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_question', 'QUERY', 'id', query_param, session);
            provider.select('dbo', 'cs_question', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_question', 'SELECT', 'id', query_param, session);
            provider.select('dbo', 'cf_mui_cs_question()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('dbo', 'cs_question', data, function() {
                onQueryListener('cs_question', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('dbo', 'cs_question', 'id', data, function() {
                onQueryListener('cs_question', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('dbo', 'cs_question', 'id', data, function() {
                onQueryListener('cs_question', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('dbo', 'cs_question', 'id', data, function() {
                onQueryListener('cs_question', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_question', 'COUNT', 'id', query_param, session);
            provider.count('dbo', 'cs_question', query_param, callback);
        }
    }
}

/**
 * Тип результат
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_default:boolean - По умолчанию
 *      b_disabled:boolean - Отключено
 *      c_const:text - Константа
 *      c_name:text - Наименование
 *      c_short_name:text - Краткое наименование
 *      id:integer - Идентификатор
 *      n_code:integer - Код
 *      n_order:integer - Отключено
 * // примеры выборки
 * [{ action: "cs_result_types", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_result_types", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_result_types", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_result_types", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_result_types", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_result_types", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_result_types", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_result_types = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_result_types', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cs_result_types', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_result_types', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cs_result_types()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cs_result_types', data, function() {
                onQueryListener('cs_result_types', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cs_result_types', 'id', data, function() {
                onQueryListener('cs_result_types', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cs_result_types', 'id', data, function() {
                onQueryListener('cs_result_types', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cs_result_types', 'id', data, function() {
                onQueryListener('cs_result_types', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_result_types', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cs_result_types', query_param, callback);
        }
    }
}

/**
 * Тип результат
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_disabled:boolean - Отключено
 *      c_const:text - Константа
 *      c_name:text - Наименование
 *      c_short_name:text - Краткое наименование
 *      id:integer - Идентификатор
 *      n_code:integer - Код
 *      n_order:integer - Приоритет статуса (чем больше число тем выше статус)
 * // примеры выборки
 * [{ action: "cs_route_statuses", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_route_statuses", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_route_statuses", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_route_statuses", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_route_statuses", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_route_statuses", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_route_statuses", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_route_statuses = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_route_statuses', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cs_route_statuses', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_route_statuses', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cs_route_statuses()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cs_route_statuses', data, function() {
                onQueryListener('cs_route_statuses', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cs_route_statuses', 'id', data, function() {
                onQueryListener('cs_route_statuses', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cs_route_statuses', 'id', data, function() {
                onQueryListener('cs_route_statuses', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cs_route_statuses', 'id', data, function() {
                onQueryListener('cs_route_statuses', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_route_statuses', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cs_route_statuses', query_param, callback);
        }
    }
}

/**
 * Тип маршрута
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_default:boolean - По умолчанию
 *      b_disabled:boolean - Отключено
 *      c_const:text - Константа
 *      c_name:text - Наименование
 *      c_short_name:text - Краткое наименование
 *      id:integer - Идентификатор
 *      n_code:integer - Код
 *      n_order:integer - Сортировка
 * // примеры выборки
 * [{ action: "cs_route_types", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_route_types", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_route_types", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_route_types", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_route_types", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_route_types", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_route_types", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_route_types = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_route_types', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cs_route_types', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_route_types', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cs_route_types()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cs_route_types', data, function() {
                onQueryListener('cs_route_types', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cs_route_types', 'id', data, function() {
                onQueryListener('cs_route_types', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cs_route_types', 'id', data, function() {
                onQueryListener('cs_route_types', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cs_route_types', 'id', data, function() {
                onQueryListener('cs_route_types', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_route_types', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cs_route_types', query_param, callback);
        }
    }
}

/**
 * Тип настройки
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_default:boolean - По умолчанию
 *      b_disabled:boolean - Отключено
 *      c_const:text - Константа
 *      c_name:text - Наименование
 *      c_short_name:text - Краткое наименование
 *      id:integer - Идентификатор
 *      n_code:integer - Код
 *      n_order:integer - Сортировка
 * // примеры выборки
 * [{ action: "cs_setting_types", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_setting_types", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_setting_types", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_setting_types", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_setting_types", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_setting_types", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_setting_types", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_setting_types = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_setting_types', 'QUERY', 'id', query_param, session);
            provider.select('core', 'cs_setting_types', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_setting_types', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_cs_setting_types()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'cs_setting_types', data, function() {
                onQueryListener('cs_setting_types', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'cs_setting_types', 'id', data, function() {
                onQueryListener('cs_setting_types', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'cs_setting_types', 'id', data, function() {
                onQueryListener('cs_setting_types', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'cs_setting_types', 'id', data, function() {
                onQueryListener('cs_setting_types', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_setting_types', 'COUNT', 'id', query_param, session);
            provider.count('core', 'cs_setting_types', query_param, callback);
        }
    }
}

/**
 * Улицы
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: dbo
 * Поля:
 *      id:uuid - Идентификатор
 *      b_disabled:boolean - b_disabled
 *      c_name:text - улица
 *      c_short_type:text - c_short_type
 *      c_type:text - Тип
 *      dx_date:timestamp with time zone - dx_date
 *      f_location:integer - f_location
 *      f_main_division:integer - Город
 *      f_user:integer (core.pd_users.id) - f_user
 *      n_latitude:numeric - n_latitude
 *      n_longitude:numeric - n_longitude
 * // примеры выборки
 * [{ action: "cs_street", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_street", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_street", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_street", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_street", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_street", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_street", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_street = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_street', 'QUERY', 'id', query_param, session);
            provider.select('dbo', 'cs_street', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_street', 'SELECT', 'id', query_param, session);
            provider.select('dbo', 'cf_mui_cs_street()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('dbo', 'cs_street', data, function() {
                onQueryListener('cs_street', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('dbo', 'cs_street', 'id', data, function() {
                onQueryListener('cs_street', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('dbo', 'cs_street', 'id', data, function() {
                onQueryListener('cs_street', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('dbo', 'cs_street', 'id', data, function() {
                onQueryListener('cs_street', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_street', 'COUNT', 'id', query_param, session);
            provider.count('dbo', 'cs_street', query_param, callback);
        }
    }
}

/**
 * 
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: dbo
 * Поля:
 *      f_division:integer (core.sd_divisions.id) - f_division
 *      f_subdivision:integer (core.sd_subdivisions.id) - f_subdivision
 *      f_uik:integer (dbo.cd_uik.id) - f_uik
 *      id:integer - id
 * // примеры выборки
 * [{ action: "cs_uik_ref", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_cs_uik_ref", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "cs_uik_ref", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "cs_uik_ref", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "cs_uik_ref", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "cs_uik_ref", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cs_uik_ref", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cs_uik_ref = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cs_uik_ref', 'QUERY', 'id', query_param, session);
            provider.select('dbo', 'cs_uik_ref', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('cs_uik_ref', 'SELECT', 'id', query_param, session);
            provider.select('dbo', 'cf_mui_cs_uik_ref()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('dbo', 'cs_uik_ref', data, function() {
                onQueryListener('cs_uik_ref', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('dbo', 'cs_uik_ref', 'id', data, function() {
                onQueryListener('cs_uik_ref', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('dbo', 'cs_uik_ref', 'id', data, function() {
                onQueryListener('cs_uik_ref', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('dbo', 'cs_uik_ref', 'id', data, function() {
                onQueryListener('cs_uik_ref', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('cs_uik_ref', 'COUNT', 'id', query_param, session);
            provider.count('dbo', 'cs_uik_ref', query_param, callback);
        }
    }
}

/**
 * 
 * @example
 * Тип: VIEW
 * Схема: dbo
 * Поля:
 *      c_name:text - c_name
 *      id:uuid - id
 * // примеры выборки
 * [{ action: "cv_street", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cv_street", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cv_street = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cv_street', 'QUERY', '', query_param, session);
            provider.select('dbo', 'cv_street', query_param, filter.security(session), callback);
        },
        Count: function (query_param, callback) {
            onQueryListener('cv_street', 'COUNT', '', query_param, session);
            provider.count('dbo', 'cv_street', query_param, callback);
        }
    }
}

/**
 * 
 * @example
 * Тип: VIEW
 * Схема: dbo
 * Поля:
 *      c_name:text - c_name
 *      c_network_status:text - c_network_status
 *      d_date:timestamp with time zone - d_date
 *      d_date_str:text - d_date_str
 *      f_user:integer - f_user
 *      n_latitude:numeric - n_latitude
 *      n_longitude:numeric - n_longitude
 * // примеры выборки
 * [{ action: "cv_tracking", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cv_tracking", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cv_tracking = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cv_tracking', 'QUERY', '', query_param, session);
            provider.select('dbo', 'cv_tracking', query_param, filter.security(session), callback);
        },
        Count: function (query_param, callback) {
            onQueryListener('cv_tracking', 'COUNT', '', query_param, session);
            provider.count('dbo', 'cv_tracking', query_param, callback);
        }
    }
}

/**
 * Привязка УИК к Округам и Районам. Вычисляется динамически
 * @example
 * Тип: VIEW
 * Схема: dbo
 * Поля:
 *      c_subdivision:text - c_subdivision
 *      f_division:integer - f_division
 *      f_subdivision:integer - f_subdivision
 *      f_uik:integer - f_uik
 * // примеры выборки
 * [{ action: "cv_uik_ref", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cv_uik_ref", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cv_uik_ref = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cv_uik_ref', 'QUERY', '', query_param, session);
            provider.select('dbo', 'cv_uik_ref', query_param, filter.security(session), callback);
        },
        Count: function (query_param, callback) {
            onQueryListener('cv_uik_ref', 'COUNT', '', query_param, session);
            provider.count('dbo', 'cv_uik_ref', query_param, callback);
        }
    }
}

/**
 * Привязка УИК к Округам и Районам. для новочебоксарска. Временно
 * @example
 * Тип: VIEW
 * Схема: dbo
 * Поля:
 *      c_subdivision:text - c_subdivision
 *      f_division:integer - f_division
 *      f_subdivision:integer - f_subdivision
 *      f_uik:integer - f_uik
 * // примеры выборки
 * [{ action: "cv_uik_tmp_nov_ref", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "cv_uik_tmp_nov_ref", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.cv_uik_tmp_nov_ref = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('cv_uik_tmp_nov_ref', 'QUERY', '', query_param, session);
            provider.select('dbo', 'cv_uik_tmp_nov_ref', query_param, filter.security(session), callback);
        },
        Count: function (query_param, callback) {
            onQueryListener('cv_uik_tmp_nov_ref', 'COUNT', '', query_param, session);
            provider.count('dbo', 'cv_uik_tmp_nov_ref', query_param, callback);
        }
    }
}

/**
 * 
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: rpt
 * Поля:
 *      c_url:text - c_url
 *      dx_created:timestamp with time zone - dx_created
 *      dx_modified:timestamp with time zone - dx_modified
 *      id:uuid - id
 *      jb_data:jsonb - JSON
 * // примеры выборки
 * [{ action: "gosuslugi", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_gosuslugi", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "gosuslugi", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "gosuslugi", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "gosuslugi", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "gosuslugi", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "gosuslugi", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.gosuslugi = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('gosuslugi', 'QUERY', 'id', query_param, session);
            provider.select('rpt', 'gosuslugi', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('gosuslugi', 'SELECT', 'id', query_param, session);
            provider.select('rpt', 'cf_mui_gosuslugi()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('rpt', 'gosuslugi', data, function() {
                onQueryListener('gosuslugi', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('rpt', 'gosuslugi', 'id', data, function() {
                onQueryListener('gosuslugi', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('rpt', 'gosuslugi', 'id', data, function() {
                onQueryListener('gosuslugi', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('rpt', 'gosuslugi', 'id', data, function() {
                onQueryListener('gosuslugi', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('gosuslugi', 'COUNT', 'id', query_param, session);
            provider.count('rpt', 'gosuslugi', query_param, callback);
        }
    }
}

/**
 * Права доступа
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_creatable:boolean - Разрешено создание
 *      b_deletable:boolean - Разрешено удалени
 *      b_editable:boolean - Разрешено редактирование
 *      b_full_control:boolean - Дополнительный доступ
 *      c_columns:text - Запрещенные колонки
 *      c_criteria:text - Серверный фильтр
 *      c_function:text - Функция RPC или её часть
 *      c_name:text - Табл./Предст./Функц.
 *      c_path:text - Путь в файловой системе
 *      f_role:integer (core.pd_roles.id) - Роль
 *      f_user:integer (core.pd_users.id) - Пользователь
 *      id:integer - Идентификатор
 *      sn_delete:boolean - Удален
 * // примеры выборки
 * [{ action: "pd_accesses", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_pd_accesses", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "pd_accesses", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "pd_accesses", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "pd_accesses", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "pd_accesses", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "pd_accesses", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.pd_accesses = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('pd_accesses', 'QUERY', 'id', query_param, session);
            provider.select('core', 'pd_accesses', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('pd_accesses', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_pd_accesses()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'pd_accesses', data, function() {
                onQueryListener('pd_accesses', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'pd_accesses', 'id', data, function() {
                onQueryListener('pd_accesses', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'pd_accesses', 'id', data, function() {
                onQueryListener('pd_accesses', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'pd_accesses', 'id', data, function() {
                onQueryListener('pd_accesses', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('pd_accesses', 'COUNT', 'id', query_param, session);
            provider.count('core', 'pd_accesses', query_param, callback);
        }
    }
}

/**
 * Роли
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      c_description:text - Описание роли
 *      c_name:text - Наименование
 *      id:integer - Идентификатор
 *      n_weight:integer - Приоритет
 *      sn_delete:boolean - Удален
 * // примеры выборки
 * [{ action: "pd_roles", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_pd_roles", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "pd_roles", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "pd_roles", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "pd_roles", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "pd_roles", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "pd_roles", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.pd_roles = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('pd_roles', 'QUERY', 'id', query_param, session);
            provider.select('core', 'pd_roles', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('pd_roles', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_pd_roles()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'pd_roles', data, function() {
                onQueryListener('pd_roles', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'pd_roles', 'id', data, function() {
                onQueryListener('pd_roles', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'pd_roles', 'id', data, function() {
                onQueryListener('pd_roles', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'pd_roles', 'id', data, function() {
                onQueryListener('pd_roles', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('pd_roles', 'COUNT', 'id', query_param, session);
            provider.count('core', 'pd_roles', query_param, callback);
        }
    }
}

/**
 * Привязка пользователей к району, округу, уик.Привязка делать построчно.
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      f_division:integer (core.sd_divisions.id) - Район
 *      f_subdivision:integer (core.sd_subdivisions.id) - Округ
 *      f_uik:integer (dbo.cd_uik.id) - f_uik
 *      f_user:integer (core.pd_users.id) - Пользователь
 *      id:integer - Идентификатор
 *      n_gos_subdivision:integer - Номер округа госсовета
 *      sn_delete:boolean - Признак удаленной записи
 * // примеры выборки
 * [{ action: "pd_userindivisions", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_pd_userindivisions", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "pd_userindivisions", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "pd_userindivisions", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "pd_userindivisions", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "pd_userindivisions", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "pd_userindivisions", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.pd_userindivisions = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('pd_userindivisions', 'QUERY', 'id', query_param, session);
            provider.select('core', 'pd_userindivisions', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('pd_userindivisions', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_pd_userindivisions()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'pd_userindivisions', data, function() {
                onQueryListener('pd_userindivisions', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'pd_userindivisions', 'id', data, function() {
                onQueryListener('pd_userindivisions', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'pd_userindivisions', 'id', data, function() {
                onQueryListener('pd_userindivisions', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'pd_userindivisions', 'id', data, function() {
                onQueryListener('pd_userindivisions', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('pd_userindivisions', 'COUNT', 'id', query_param, session);
            provider.count('core', 'pd_userindivisions', query_param, callback);
        }
    }
}

/**
 * Пользователи в ролях
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      f_role:integer (core.pd_roles.id) - Роль
 *      f_user:integer (core.pd_users.id) - Пользователь
 *      id:integer - Идентификатор
 *      sn_delete:boolean - Удален
 * // примеры выборки
 * [{ action: "pd_userinroles", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_pd_userinroles", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "pd_userinroles", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "pd_userinroles", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "pd_userinroles", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "pd_userinroles", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "pd_userinroles", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.pd_userinroles = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('pd_userinroles', 'QUERY', 'id', query_param, session);
            provider.select('core', 'pd_userinroles', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('pd_userinroles', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_pd_userinroles()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'pd_userinroles', data, function() {
                onQueryListener('pd_userinroles', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'pd_userinroles', 'id', data, function() {
                onQueryListener('pd_userinroles', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'pd_userinroles', 'id', data, function() {
                onQueryListener('pd_userinroles', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'pd_userinroles', 'id', data, function() {
                onQueryListener('pd_userinroles', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('pd_userinroles', 'COUNT', 'id', query_param, session);
            provider.count('core', 'pd_userinroles', query_param, callback);
        }
    }
}

/**
 * Пользователи
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_disabled:boolean - Отключен
 *      c_address:text - Адрес
 *      c_area:text - Регион
 *      c_area_part:text - Местное отделение
 *      c_bit1:text - Секретарь ПО
 *      c_bit2:text - Мун. деп.
 *      c_bit3:text - Член МПС
 *      c_bit4:text - Член РПС
 *      c_bit5:text - Член ГС
 *      c_bit6:text - Член ПРПС
 *      c_bit7:text - Секретарь МО
 *      c_bit8:text - Партийный статус
 *      c_description:text - Описание
 *      c_email:text - Эл. почта
 *      c_facebook:text - Facebook
 *      c_first_name:text - Имя
 *      c_job:text - Должность
 *      c_last_name:text - Имя
 *      c_login:text - Логин
 *      c_middle_name:text - Отчество
 *      c_notice:text - Примечание
 *      c_ok:text - OK
 *      c_password:text - Пароль
 *      c_phone:text - Телефон
 *      c_phone_home:text - Домашний телефон
 *      c_phone_main:text - Телефон ответственного
 *      c_twitter:text - Twitter
 *      c_version:text - Версия мобильного приложения
 *      c_vk:text - VK
 *      c_work:text - Место работы
 *      d_birthday:date - Дата рождения
 *      fn_file:uuid (core.cd_files.id) - Иконка
 *      f_parent:integer (core.pd_users.id) - Родитель
 *      id:integer - Идентификатор
 *      n_uik:integer - УИК
 *      n_version:bigint - Версия мобильного приложения - Число
 *      s_hash:text - Hash
 *      sn_delete:boolean - Удален
 *      s_salt:text - Salt
 * // примеры выборки
 * [{ action: "pd_users", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_pd_users", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "pd_users", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "pd_users", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "pd_users", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "pd_users", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "pd_users", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.pd_users = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('pd_users', 'QUERY', 'id', query_param, session);
            provider.select('core', 'pd_users', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('pd_users', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_pd_users()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'pd_users', data, function() {
                onQueryListener('pd_users', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'pd_users', 'id', data, function() {
                onQueryListener('pd_users', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'pd_users', 'id', data, function() {
                onQueryListener('pd_users', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'pd_users', 'id', data, function() {
                onQueryListener('pd_users', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('pd_users', 'COUNT', 'id', query_param, session);
            provider.count('core', 'pd_users', query_param, callback);
        }
    }
}

/**
 * Системная функция. Получение прав доступа для пользователя. Используется NodeJS
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "pf_accesses", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "pf_accesses", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.pf_accesses = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'pf_accesses', query_param.params, function() {
                onQueryListener('pf_accesses', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('core', 'pf_accesses()', query_param, filter.security(session), function() {
                onQueryListener('pf_accesses', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Обновление ролей у пользователя
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "pf_update_user_roles", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.pf_update_user_roles = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'pf_update_user_roles', query_param.params, function() {
                onQueryListener('pf_update_user_roles', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Открытый список пользователей
 * @example
 * Тип: VIEW
 * Схема: core
 * Поля:
 *      b_disabled:boolean - b_disabled
 *      c_claims:text - c_claims
 *      c_description:text - c_description
 *      c_email:text - c_email
 *      c_first_name:text - c_first_name
 *      c_login:text - c_login
 *      c_phone:text - c_phone
 *      c_version:text - c_version
 *      fn_file:uuid - fn_file
 *      f_parent:integer - f_parent
 *      id:integer - id
 *      n_version:bigint - n_version
 * // примеры выборки
 * [{ action: "pv_users", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "pv_users", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.pv_users = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('pv_users', 'QUERY', '', query_param, session);
            provider.select('core', 'pv_users', query_param, filter.security(session), callback);
        },
        Count: function (query_param, callback) {
            onQueryListener('pv_users', 'COUNT', '', query_param, session);
            provider.count('core', 'pv_users', query_param, callback);
        }
    }
}

/**
 * 
 * @example
 * Тип: VIEW
 * Схема: rpt
 * Поля:
 *      c_org:text - c_org
 * // примеры выборки
 * [{ action: "rs_orgs", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "rs_orgs", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.rs_orgs = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('rs_orgs', 'QUERY', '', query_param, session);
            provider.select('rpt', 'rs_orgs', query_param, filter.security(session), callback);
        },
        Count: function (query_param, callback) {
            onQueryListener('rs_orgs', 'COUNT', '', query_param, session);
            provider.count('rpt', 'rs_orgs', query_param, callback);
        }
    }
}

/**
 * 
 * @example
 * Тип: VIEW
 * Схема: rpt
 * Поля:
 *      c_build:text - c_build
 *      c_city:text - c_city
 *      c_first_name:text - c_first_name
 *      c_gos_subdivision:text - c_gos_subdivision
 *      c_group:text - c_group
 *      c_house:text - c_house
 *      c_last_name:text - c_last_name
 *      c_main_fio:text - c_main_fio
 *      c_main_group:text - c_main_group
 *      c_main_tel:text - c_main_tel
 *      c_middle_name:text - c_middle_name
 *      c_org:text - c_org
 *      c_org_fio:text - c_org_fio
 *      c_org_tel:text - c_org_tel
 *      c_premise:text - c_premise
 *      c_snils:text - c_snils
 *      c_street:text - c_street
 *      c_tel:text - c_tel
 *      c_uik:text - c_uik
 *      c_user_type:text - c_user_type
 *      id:uuid - id
 * // примеры выборки
 * [{ action: "rv_users", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "rv_users", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.rv_users = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('rv_users', 'QUERY', '', query_param, session);
            provider.select('rpt', 'rv_users', query_param, filter.security(session), callback);
        },
        Count: function (query_param, callback) {
            onQueryListener('rv_users', 'COUNT', '', query_param, session);
            provider.count('rpt', 'rv_users', query_param, callback);
        }
    }
}

/**
 * Клиентские ошибки
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      c_code:text - Код ошибки
 *      c_message:text - Текст ошибки
 *      c_platform:text - Тип платформы
 *      c_version:text - Версия приложения
 *      d_created:timestamp with time zone - Дата возникновения ошибки
 *      dx_date:timestamp with time zone - Дата записи на сервере
 *      fn_user:integer (core.pd_users.id) - Идентификатор пользователя
 *      id:uuid - Идентификатор
 *      jb_data:jsonb - Прочии данные
 * // примеры выборки
 * [{ action: "sd_client_errors", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_sd_client_errors", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "sd_client_errors", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "sd_client_errors", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "sd_client_errors", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "sd_client_errors", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "sd_client_errors", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sd_client_errors = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('sd_client_errors', 'QUERY', 'id', query_param, session);
            provider.select('core', 'sd_client_errors', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('sd_client_errors', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_sd_client_errors()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'sd_client_errors', data, function() {
                onQueryListener('sd_client_errors', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'sd_client_errors', 'id', data, function() {
                onQueryListener('sd_client_errors', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'sd_client_errors', 'id', data, function() {
                onQueryListener('sd_client_errors', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'sd_client_errors', 'id', data, function() {
                onQueryListener('sd_client_errors', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('sd_client_errors', 'COUNT', 'id', query_param, session);
            provider.count('core', 'sd_client_errors', query_param, callback);
        }
    }
}

/**
 * Журнал версий
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      ba_file:bytea - Файл для обновления
 *      b_hidden:boolean - Скрыт
 *      c_description:text - Описание
 *      c_version:text - Версия
 *      dx_created:timestamp with time zone - dx_created
 *      f_division:integer (core.sd_divisions.id) - Отделение
 *      id:integer - Идентификатор
 *      n_version:bigint - Номер версии
 * // примеры выборки
 * [{ action: "sd_digests", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_sd_digests", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "sd_digests", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "sd_digests", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "sd_digests", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "sd_digests", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "sd_digests", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sd_digests = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('sd_digests', 'QUERY', 'id', query_param, session);
            provider.select('core', 'sd_digests', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('sd_digests', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_sd_digests()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'sd_digests', data, function() {
                onQueryListener('sd_digests', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'sd_digests', 'id', data, function() {
                onQueryListener('sd_digests', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'sd_digests', 'id', data, function() {
                onQueryListener('sd_digests', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'sd_digests', 'id', data, function() {
                onQueryListener('sd_digests', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('sd_digests', 'COUNT', 'id', query_param, session);
            provider.count('core', 'sd_digests', query_param, callback);
        }
    }
}

/**
 * Районы
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_disabled:boolean - Отключено
 *      c_dep_code:text - Код отделения (филиала)
 *      c_name:text - Наименование
 *      f_division:integer (core.sd_divisions.id) - Вышестоящее отделение
 *      id:integer - Идентификатор
 *      n_code:integer - Код
 * // примеры выборки
 * [{ action: "sd_divisions", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_sd_divisions", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "sd_divisions", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "sd_divisions", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "sd_divisions", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "sd_divisions", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "sd_divisions", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sd_divisions = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('sd_divisions', 'QUERY', 'id', query_param, session);
            provider.select('core', 'sd_divisions', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('sd_divisions', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_sd_divisions()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'sd_divisions', data, function() {
                onQueryListener('sd_divisions', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'sd_divisions', 'id', data, function() {
                onQueryListener('sd_divisions', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'sd_divisions', 'id', data, function() {
                onQueryListener('sd_divisions', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'sd_divisions', 'id', data, function() {
                onQueryListener('sd_divisions', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('sd_divisions', 'COUNT', 'id', query_param, session);
            provider.count('core', 'sd_divisions', query_param, callback);
        }
    }
}

/**
 * Округа
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      b_city:boolean - Является госсоветом
 *      b_disabled:boolean - Отключено
 *      c_dep_code:text - Текстовый код
 *      c_name:text - Наименование
 *      f_division:integer (core.sd_divisions.id) - Отделение
 *      id:integer - Идентификатор
 *      n_code:integer - Код
 * // примеры выборки
 * [{ action: "sd_subdivisions", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_sd_subdivisions", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "sd_subdivisions", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "sd_subdivisions", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "sd_subdivisions", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "sd_subdivisions", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "sd_subdivisions", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sd_subdivisions = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('sd_subdivisions', 'QUERY', 'id', query_param, session);
            provider.select('core', 'sd_subdivisions', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('sd_subdivisions', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_sd_subdivisions()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'sd_subdivisions', data, function() {
                onQueryListener('sd_subdivisions', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'sd_subdivisions', 'id', data, function() {
                onQueryListener('sd_subdivisions', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'sd_subdivisions', 'id', data, function() {
                onQueryListener('sd_subdivisions', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'sd_subdivisions', 'id', data, function() {
                onQueryListener('sd_subdivisions', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('sd_subdivisions', 'COUNT', 'id', query_param, session);
            provider.count('core', 'sd_subdivisions', query_param, callback);
        }
    }
}

/**
 * Изменение состояния таблицы
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      f_user:integer (core.pd_users.id) - f_user
 *      id:bigint - id
 *      n_change:double precision - Версия изменения
 * // примеры выборки
 * [{ action: "sd_table_change", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_sd_table_change", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "sd_table_change", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "sd_table_change", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "sd_table_change", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "sd_table_change", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "sd_table_change", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sd_table_change = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('sd_table_change', 'QUERY', 'id', query_param, session);
            provider.select('core', 'sd_table_change', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('sd_table_change', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_sd_table_change()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'sd_table_change', data, function() {
                onQueryListener('sd_table_change', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'sd_table_change', 'id', data, function() {
                onQueryListener('sd_table_change', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'sd_table_change', 'id', data, function() {
                onQueryListener('sd_table_change', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'sd_table_change', 'id', data, function() {
                onQueryListener('sd_table_change', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('sd_table_change', 'COUNT', 'id', query_param, session);
            provider.count('core', 'sd_table_change', query_param, callback);
        }
    }
}

/**
 * Зависимость таблиц состояний
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      c_table_name:text - Таблица
 *      c_table_name_ref:text - Зависимая таблица
 *      id:smallint - id
 * // примеры выборки
 * [{ action: "sd_table_change_ref", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_sd_table_change_ref", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "sd_table_change_ref", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "sd_table_change_ref", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "sd_table_change_ref", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "sd_table_change_ref", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "sd_table_change_ref", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sd_table_change_ref = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('sd_table_change_ref', 'QUERY', 'id', query_param, session);
            provider.select('core', 'sd_table_change_ref', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('sd_table_change_ref', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_sd_table_change_ref()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'sd_table_change_ref', data, function() {
                onQueryListener('sd_table_change_ref', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'sd_table_change_ref', 'id', data, function() {
                onQueryListener('sd_table_change_ref', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'sd_table_change_ref', 'id', data, function() {
                onQueryListener('sd_table_change_ref', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'sd_table_change_ref', 'id', data, function() {
                onQueryListener('sd_table_change_ref', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('sd_table_change_ref', 'COUNT', 'id', query_param, session);
            provider.count('core', 'sd_table_change_ref', query_param, callback);
        }
    }
}

/**
 * Состояние таблиц
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: core
 * Поля:
 *      c_table_name:text - c_table_name
 *      f_user:integer - f_user
 *      id:bigint - id
 *      jb_data:jsonb - jb_data
 * // примеры выборки
 * [{ action: "sd_table_states", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_sd_table_states", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "sd_table_states", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "sd_table_states", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "sd_table_states", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "sd_table_states", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "sd_table_states", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sd_table_states = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('sd_table_states', 'QUERY', 'id', query_param, session);
            provider.select('core', 'sd_table_states', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('sd_table_states', 'SELECT', 'id', query_param, session);
            provider.select('core', 'cf_mui_sd_table_states()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('core', 'sd_table_states', data, function() {
                onQueryListener('sd_table_states', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('core', 'sd_table_states', 'id', data, function() {
                onQueryListener('sd_table_states', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('core', 'sd_table_states', 'id', data, function() {
                onQueryListener('sd_table_states', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('core', 'sd_table_states', 'id', data, function() {
                onQueryListener('sd_table_states', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('sd_table_states', 'COUNT', 'id', query_param, session);
            provider.count('core', 'sd_table_states', query_param, callback);
        }
    }
}

/**
 * Системная функция для обработки прав. Для внешнего использования не применять
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_accesses", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_accesses = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_accesses', query_param.params, function() {
                onQueryListener('sf_accesses', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Генерация версии БД
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_build_version", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_build_version = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_build_version', query_param.params, function() {
                onQueryListener('sf_build_version', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Преобразование номера агитатора в число
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "sf_convert_number", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_convert_number = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'sf_convert_number', query_param.params, function() {
                onQueryListener('sf_convert_number', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Создание УИК
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "sf_create_uik", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_create_uik = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'sf_create_uik', query_param.params, function() {
                onQueryListener('sf_create_uik', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Создание пользователя с определенными ролями
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_create_user", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_create_user = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_create_user', query_param.params, function() {
                onQueryListener('sf_create_user', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Окончательное удаление маршрута без сохранения истории
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_del_route", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_del_route = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_del_route', query_param.params, function() {
                onQueryListener('sf_del_route', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Удаление пользователя
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_del_user", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_del_user = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_del_user', query_param.params, function() {
                onQueryListener('sf_del_user', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Дистанция между двумя точками
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "sf_distance", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_distance = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'sf_distance', query_param.params, function() {
                onQueryListener('sf_distance', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Проверка даты завершения маршрута, true - маршрут активный
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_finish_date", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_finish_date = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_finish_date', query_param.params, function() {
                onQueryListener('sf_finish_date', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Статус сторонника
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: dbo
 * Поля:
 *      b_default:boolean - b_default
 *      b_disabled:boolean - b_disabled
 *      c_const:character varying - c_const
 *      c_name:character varying - c_name
 *      id:smallint - id
 *      n_order:integer - n_order
 * // примеры выборки
 * [{ action: "sf_friend_types", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_sf_friend_types", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "sf_friend_types", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "sf_friend_types", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "sf_friend_types", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "sf_friend_types", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "sf_friend_types", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_friend_types = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('sf_friend_types', 'QUERY', 'id', query_param, session);
            provider.select('dbo', 'sf_friend_types', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('sf_friend_types', 'SELECT', 'id', query_param, session);
            provider.select('dbo', 'cf_mui_sf_friend_types()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('dbo', 'sf_friend_types', data, function() {
                onQueryListener('sf_friend_types', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('dbo', 'sf_friend_types', 'id', data, function() {
                onQueryListener('sf_friend_types', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('dbo', 'sf_friend_types', 'id', data, function() {
                onQueryListener('sf_friend_types', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('dbo', 'sf_friend_types', 'id', data, function() {
                onQueryListener('sf_friend_types', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('sf_friend_types', 'COUNT', 'id', query_param, session);
            provider.count('dbo', 'sf_friend_types', query_param, callback);
        }
    }
}

/**
 * Генерация JSON информации для квартиры
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "sf_generate_point_jb_data", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_generate_point_jb_data = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'sf_generate_point_jb_data', query_param.params, function() {
                onQueryListener('sf_generate_point_jb_data', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Генерация JSON информации для дома
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "sf_generate_route_jb_data", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_generate_route_jb_data = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'sf_generate_route_jb_data', query_param.params, function() {
                onQueryListener('sf_generate_route_jb_data', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Версия БД
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_get_version", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_get_version = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_get_version', query_param.params, function() {
                onQueryListener('sf_get_version', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Сброс результатов прохождния маршрута. Системная функция, не применять на production
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_hard_reset_route", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_hard_reset_route = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_hard_reset_route', query_param.params, function() {
                onQueryListener('sf_hard_reset_route', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Импорт данных для пользователя
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "sf_imp_by_user", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_imp_by_user = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'sf_imp_by_user', query_param.params, function() {
                onQueryListener('sf_imp_by_user', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Генерация маршрутов для округа
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "sf_imp_generate_subdivision_routes", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "sf_imp_generate_subdivision_routes", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_imp_generate_subdivision_routes = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'sf_imp_generate_subdivision_routes', query_param.params, function() {
                onQueryListener('sf_imp_generate_subdivision_routes', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        },
        Select: function (query_param, callback) {
            provider.select('dbo', 'sf_imp_generate_subdivision_routes()', query_param, filter.security(session), function() {
                onQueryListener('sf_imp_generate_subdivision_routes', 'SELECT', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Генерация точек маршрута
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "sf_imp_points", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_imp_points = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'sf_imp_points', query_param.params, function() {
                onQueryListener('sf_imp_points', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Создание маршрута
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "sf_imp_route", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_imp_route = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'sf_imp_route', query_param.params, function() {
                onQueryListener('sf_imp_route', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Является ли маршрут доступным для мобильного устройства
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_is_mobile_route", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_is_mobile_route = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_is_mobile_route', query_param.params, function() {
                onQueryListener('sf_is_mobile_route', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Минимальная версия мобильного приложения для получения данных
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_is_mobile_version_valid", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_is_mobile_version_valid = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_is_mobile_version_valid', query_param.params, function() {
                onQueryListener('sf_is_mobile_version_valid', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Вычисление процента
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "sf_percent", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_percent = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'sf_percent', query_param.params, function() {
                onQueryListener('sf_percent', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Обновление информации для точки маршрута
 * @example
 * Тип: FUNCTION
 * Схема: dbo 
 * // примеры выборки
 * [{ action: "sf_point_update_info", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_point_update_info = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('dbo', 'sf_point_update_info', query_param.params, function() {
                onQueryListener('sf_point_update_info', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Процедура очистки устаревших данных
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_remove_outdated", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_remove_outdated = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_remove_outdated', query_param.params, function() {
                onQueryListener('sf_remove_outdated', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * 
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_table_change_update", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_table_change_update = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_table_change_update', query_param.params, function() {
                onQueryListener('sf_table_change_update', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Принудительное обновление версии базу данных
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_update_version", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_update_version = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_update_version', query_param.params, function() {
                onQueryListener('sf_update_version', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * Преобразование версии в число
 * @example
 * Тип: FUNCTION
 * Схема: core 
 * // примеры выборки
 * [{ action: "sf_version_to_number", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sf_version_to_number = function (session) {
    return {
        Query: function (query_param, callback) {
            provider.call('core', 'sf_version_to_number', query_param.params, function() {
                onQueryListener('sf_version_to_number', 'QUERY', null, query_param, session);
                callback(arguments[0]);
            });
        }
    }
}

/**
 * 
 * @example
 * Тип: VIEW
 * Схема: core
 * Поля:
 *      primary_key:character varying - primary_key
 *      table_comment:character varying - table_comment
 *      table_name:character varying - table_name
 *      table_schema:character varying - table_schema
 *      table_title:character varying - table_title
 *      table_type:character varying - table_type
 * // примеры выборки
 * [{ action: "sv_objects", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "sv_objects", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sv_objects = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('sv_objects', 'QUERY', '', query_param, session);
            provider.select('core', 'sv_objects', query_param, filter.security(session), callback);
        },
        Count: function (query_param, callback) {
            onQueryListener('sv_objects', 'COUNT', '', query_param, session);
            provider.count('core', 'sv_objects', query_param, callback);
        }
    }
}

/**
 * Системный список пользователей
 * @example
 * Тип: VIEW
 * Схема: core
 * Поля:
 *      b_disabled:boolean - b_disabled
 *      c_claims:text - c_claims
 *      c_first_name:text - c_first_name
 *      c_login:text - c_login
 *      c_password:text - c_password
 *      c_user_name:text - c_user_name
 *      c_version:text - c_version
 *      f_parent:integer - f_parent
 *      id:integer - id
 *      n_version:bigint - n_version
 *      s_hash:text - s_hash
 *      s_salt:text - s_salt
 * // примеры выборки
 * [{ action: "sv_users", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "sv_users", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.sv_users = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('sv_users', 'QUERY', '', query_param, session);
            provider.select('core', 'sv_users', query_param, filter.security(session), callback);
        },
        Count: function (query_param, callback) {
            onQueryListener('sv_users', 'COUNT', '', query_param, session);
            provider.count('core', 'sv_users', query_param, callback);
        }
    }
}

/**
 * 
 * @example
 * Тип: BASE TABLE
 * Первичный ключ: id
 * Схема: rpt
 * Поля:
 *      c_name:text - c_name
 *      c_org:text - c_org
 *      dx_created:timestamp without time zone - dx_created
 *      id:integer - id
 * // примеры выборки
 * [{ action: "tmp_gosuslugi", method: "Query", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры выборки через функцию
 * [{ action: "cf_mui_tmp_gosuslugi", method: "Select", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры добавления
 * [{ action: "tmp_gosuslugi", method: "Add", data: [{ }], type: "rpc", tid: 0 }]
 * // примеры обновления
 * [{ action: "tmp_gosuslugi", method: "Update", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры создания или обновления
 * [{ action: "tmp_gosuslugi", method: "AddOrUpdate", data: [{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры удаления
 * [{ action: "tmp_gosuslugi", method: "Delete", data: [{id:any ...}|[{id:any ...}], type: "rpc", tid: 0 }]
 * // примеры получения количества записей
 * [{ action: "tmp_gosuslugi", method: "Count", data: [{ }], type: "rpc", tid: 0 }]
 */
exports.tmp_gosuslugi = function (session) {
    return {
        Query: function (query_param, callback) {
            onQueryListener('tmp_gosuslugi', 'QUERY', 'id', query_param, session);
            provider.select('rpt', 'tmp_gosuslugi', query_param, filter.security(session), callback);
        },
        Select: function (query_param, callback) {
            onQueryListener('tmp_gosuslugi', 'SELECT', 'id', query_param, session);
            provider.select('rpt', 'cf_mui_tmp_gosuslugi()', query_param, filter.security(session), callback);
        },
        Add: function (data, callback) {
            provider.insert('rpt', 'tmp_gosuslugi', data, function() {
                onQueryListener('tmp_gosuslugi', 'INSERT', 'id', data, session);
                callback(arguments[0]);
            });
        },
        AddOrUpdate: function (data, callback) {
            provider.insertOrUpdate('rpt', 'tmp_gosuslugi', 'id', data, function() {
                onQueryListener('tmp_gosuslugi', 'INSERT_OR_UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Update: function (data, callback) {
            provider.update('rpt', 'tmp_gosuslugi', 'id', data, function() {
                onQueryListener('tmp_gosuslugi', 'UPDATE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Delete: function (data, callback) {
            provider.delete('rpt', 'tmp_gosuslugi', 'id', data, function() {
                onQueryListener('tmp_gosuslugi', 'DELETE', 'id', data, session);
                callback(arguments[0]);
            });
        },
        Count: function (query_param, callback) {
            onQueryListener('tmp_gosuslugi', 'COUNT', 'id', query_param, session);
            provider.count('rpt', 'tmp_gosuslugi', query_param, callback);
        }
    }
}


/**
 * Проверка авторизации. 
 * Применяется только при включенной авторизации
 * @function
 * @param {string} login логин пользователя
 * @param {function} callback функция обратного вызова
 * @example
 * db.getUser('', function(data) {
 *      if(data.meta.success) {
 *      
 *      }   
 * });
 */
exports.getUser = function(login, callback) {
    this.sv_users().Query({
        filter: [{
            property: 'c_login',
            value: login
        }]
    }, function(data) {
        callback(data);
    });
}

function onQueryListener(action, method, idName, data, session) {
    if(args.debug) {
        var item = (data && typeof data.length == 'number') ? data[0] : data;
        provider.insert('core', 'cd_action_log_user', { 
            integer_id: (item && typeof item[idName] == 'number') ? item[idName] : null,  
            uuid_id: (item && typeof item[idName] == 'string') ? item[idName] : null,
            c_action: action,
            c_method: method,
            f_user: session ? session.user.id : -1,
            jb_data: data ? (typeof data == 'string' ? data : JSON.stringify(data)) : '[{}]'
        }, function() {});
    }
}