/**
 * @file router/exists.js
 * @project node-service
 * @author Александр
 * @todo проверка для доступности сервера
 */

var express = require("express");
var router = express.Router();
var pkg = require('../package.json');
var db = require('../modules/dbcontext');

module.exports = function () {
    router.get("/", exists);
    return router;
}

/**
 * Проверка на доступность сервера
 * @param {*} req 
 * @param {*} res 
 * @example
 * GET ~/exists
 * 
 * {
 *      version: string - версия серверной службы
 *      dbVersion: string - версия БД
 *      ip: string - IP клиента
 * }
 */
function exists(req, res) {
    db.sf_get_version().Query({}, function (version) {

        var dbVersion = '0.0.0.0';
        if (version.meta.success) {
            dbVersion = version.result.records[0].sf_get_version;
        } else {
            dbVersion = version.meta.msg;
        }
        res.json({
            version: pkg.version,
            dbVersion: dbVersion,
            ip: req.ip
        });
    });
}