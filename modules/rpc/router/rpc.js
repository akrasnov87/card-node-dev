/**
 * @file modules/rpc/router/rpc.js
 * @project node-service
 * @author Александр
 * @todo Выполнение RPC запросов
 */

var express = require('express');
var router = express.Router();
var join = require('path').join;

var rpcQuery = require('../modules/rpc-query');
var authUtil = require('../../authorize/util');
var cacher = require('../modules/accesses-cacher');
var conf = require('node-config')(join(__dirname, '../', '../', '../'));
var handler = require('../modules/rpc-handler');
var db = require('../../dbcontext');
var converter = require('json-2-csv');
var accessFilter = require('../modules/access-filter');
var utils = require('../../utils');
var keygen = require('../../authorize/keygen');

module.exports = function (auth_type) {
    var authType = authUtil.getAuthModule(auth_type);
    router.use('/rpc', authType.user(false));

    router.post('/rpc', post_rpc);
    router.use('/rpc/:format', authType.user(false));
    router.use('/rpc/:format/:table', authType.user(false));

    router.post('/rpc/:format', post_rpc);
    router.post('/rpc/:format/:table', post_rpc);
    router.get('/rpc/meta', get_rpc_meta);

    return router;
}

/**
 * POST запрос для обработки RPC. Доступен по авторизации
 * @param {*} req 
 * @param {*} res 
 * @example
 * POST ~/rpc 
 * // подробнее тут https://www.appcode.pw/?page_id=412
 */
function post_rpc(req, res) {
    req.isFrom = true;
    let isCsv = req.params.format == 'csv';
    let table = req.params.table;

    if(keygen.check() == undefined) {
        return res.json([{
            meta: {
                success: false,
                msg: 'Система не активирована'
            },
            code: 125,
            tid: 0,
            type: "rpc",
            method: '',
            action: '',
            host: utils.getCurrentHost()
        }]);
    }

    if(req.headers['content-type'].indexOf('text/csv') >= 0) {
        // значит тип импорт данных
        var csv = '';
        req.on('data', chunk => { csv += chunk.toString() });

        req.on('end', () => {
            var schema = global.schemas;
            var item = { action: table, method: 'Add', data:[], tid: 0, type:'rpc' };
            accessFilter.filter(item, res.user.id, schema, function (err, rows) {
                if (rows) {
                    converter.csv2json(csv.replace(/,\r/g, ',null').replace(/\r/g, ''), (err, array)=>{
                        if(err) {
                            res.send(err);
                        } else {
                            var sessionState = {
                                user: res.user,
                                isAuthorize: res.isAuthorize,
                                response: res,
                                request: req
                            };

                            db[table](sessionState).Add(array, (meta)=>{
                                res.json([{
                                    meta: meta.meta,
                                    code: meta.code,
                                    tid: item.tid,
                                    type: "rpc",
                                    method: item.method,
                                    action: item.action,
                                    host: utils.getCurrentHost(),
                                    rpcTime: meta.rpcTime,
                                    time: meta.time
                                }]);
                            });
                        }
                    });
                } else {
                    res.json([{
                        meta: {
                            success: false,
                            msg: 'Пользователь не имеет прав на выполнение операции. ' + err
                        },
                        code: 401,
                        tid: item.tid,
                        type: "rpc",
                        method: item.method,
                        action: item.action,
                        host: utils.getCurrentHost()
                    }]);
                }
            });
        });
    } else {
        handler(req, res, function (results) {
            if(isCsv) {
                // https://github.com/mrodrig/json-2-csv/blob/stable/README.md
                //git+https://github.com/akrasnov87/json-2-csv.git
                converter.json2csv(results[0].result.records, (err, csv) => {
                    res.send(err||csv);
                }, {
                    prependHeader: true,
                    unwindArrays: true,
                    emptyFieldValue: null
                });
            } else {
                res.json(results);
            }
        });
    }
}

/**
 * GET-запрос для получение мета-информации для RPC
 * @param {*} req 
 * @param {*} res 
 * @example
 * GET ~/rpc/meta
 */
function get_rpc_meta(req, res) {
    cacher.getAccesses(res.user.id, function (data) {
        db.sf_get_version().Query({}, function (version) {

            var dbVersion = '0.0.0.0';
            if (version.meta.success) {
                dbVersion = version.result.records[0].sf_get_version;
            }

            var records = data.result.records;

            var sessionState = {
                user: res.user,
                isAuthorize: res.isAuthorize,
                response: res,
                request: req
            };

            res.json(rpcQuery.meta({
                namespace: conf.get('remote_namespace'),
                dbVersion: dbVersion,
                accesses: records // список разделов куда разрешен доступ
            }, sessionState));
        });
    });
}