/**
 * @file modules/rpc/modules/accesses-cacher.js
 * @project node-service
 * @author Александр
 */

var db = require('../../dbcontext');

/**
 * Размер буфера для безопасности
 * @todo можно переопределить в global.ACCESS_BUFFER_SIZE
 * @type {number}
 * @default 100
 */
var buffer_size = global.ACCESS_BUFFER_SIZE || 100;

/**
 * буфер безопасностей
 * @type {any[]}
 */
var buffers = [];


/**
 * получение списка безопасностей
 * @param {number} user_id идентификатор пользователя
 * @param {function} callback функция обратного вызова
 */
exports.getAccesses = function (user_id, callback) {
    var result = null;
    for (var i = 0; i < buffers.length; i++) {
        var item = buffers[i];
        if (item.user_id == user_id) {
            result = item;
            break;
        }
    }

    if (!result) {
        // добавляем пользователя в кэш
        db.pf_accesses().Query({
            params: {
                n_user_id: user_id
            }
        }, function (result) {
            if (result.meta.success == false)
                callback(result, convertResult(result));
            else {
                buffers.push({
                    user_id: user_id,
                    result: result
                });
                clearBuffers();
                callback(result, convertResult(result));
            }
        });
    } else {
        callback(result.result, convertResult(result.result));
    }
}

/**
 * очистка буфера
 */
exports.clearBuffer = clearBuffer

function clearBuffer() {
    buffers = [];
}

var tableState = {};

exports.getTableState = getTableState;

function getTableState(isFrom, user, callback) {
    if(isFrom == true) {
        db.cf_mui_sd_table_change().Select({
            params:[user ? user.id : null, '']
        }, function(res) {
            var data = {};
            for(var i in res.result.records) {
                data[res.result.records[i].c_table_name] = res.result.records[i].n_change;
            }

            // тут нужно проверить если версия предыдущей безопасности отличается, то сбрасываем кэш
            if(data.pd_accesses != tableState.pd_accesses || data.pd_userinroles != tableState.pd_userinroles) {
                tableState = data; // обновляем состояние
                clearBuffer(); // и сбрасываем кэш
            }

            callback(data);
        });
    } else {
        callback(null);
    }
}

/**
 * удаление данных из буфера
 */
function clearBuffers() {
    if (buffers.length > buffer_size) {
        return buffers.splice(0, 50);
    }
}

function convertResult(result) {
    if (result.meta.success) {
        var accesses = {
            isDeletable: null,
            tables: null,
            access: {},
            delete: {},
            method: {
                Add: {},
                Update: {},
                AddOrUpdate: {},
                Delete: {},
                Query: {},
                Select: {},
                Count: {}
            },
            criteria: {},
            rpc_function: [],
            columns: {},
            getTable: function (schema, name) {
                if (this.tables) {
                    return this.tables[name];
                } else {
                    this.tables = {};
                    var me = this;
                    schema.tables.forEach(function (i) {
                        me.tables[i.TABLE_NAME] = i;
                    });
                    return this.tables[name];
                }
            },
            getIsDeletable: function (action, schema) {
                if (this.isDeletable) {
                    return this.isDeletable[action] == true;
                } else {
                    this.isDeletable = {};
                    var me = this;
                    schema.tables.forEach(function (i) {
                        var fields = i.FIELDS;
                        var field = fields.filter((j) => {
                            return j.COLUMN_NAME == 'sn_delete';
                        });

                        me.isDeletable[i.TABLE_NAME] = field.length > 0;
                    });
                    return this.isDeletable[action] == true;
                }
            }
        };

        result.result.records.forEach(function (item) {
            if (item.access > 0 && (item.table_name || item.rpc_function))
                accesses.access[item.table_name] = {};

            if (item.is_deletable == true && item.is_fullcontrol == true)
                accesses.delete[item.table_name] = true;

            if (item.is_deletable == true && item.is_fullcontrol == false)
                accesses.delete[item.table_name] = false;

            if (item.is_creatable == true)
                accesses.method['Add'][item.table_name] = true;

            if (item.is_editable == true)
                accesses.method['Update'][item.table_name] = true;

            if (item.is_editable == true && item.is_creatable == true)
                accesses.method['AddOrUpdate'][item.table_name] = true;

            if (item.is_deletable == true)
                accesses.method['Delete'][item.table_name] = true;

            accesses.method['Select'][item.table_name] = true;
            accesses.method['Query'][item.table_name] = true;
            accesses.method['Count'][item.table_name] = true;

            if (item.rpc_function)
                accesses.rpc_function.push(item);

            if (item.record_criteria != undefined && item.record_criteria != null && item.record_criteria.trim() != '' && item.access > 0) {
                if (!accesses.criteria[item.table_name]) {
                    accesses.criteria[item.table_name] = [];
                }
                accesses.criteria[item.table_name].push(item);
            }

            if (item.access > 0 && item.column_name) {
                if (!accesses.columns[item.table_name]) {
                    accesses.columns[item.table_name] = [];
                }
                accesses.columns[item.table_name].push(item);
            }
        });
        return accesses;
    }
    return null;
}