/**
 * @file router/upload.js
 * @project simple-rpc
 * @author Александр
 * @todo проверка для доступности сервера
 */

var express = require("express");
var router = express.Router();
var db = require('../modules/dbcontext');
var fs = require('fs');
var join = require('path').join;
var apkReader = require('node-apk-parser');

module.exports = function () {
    router.get("/version-file", function (req, res) {
        var from = req.query.from;
        var filters = [{ property: "b_hidden", operator: "=", value: false }];
        if (from && from.toLowerCase() == 'release') {
            filters.push({ property: "c_version", operator: "like", value: '.3.' });
        }

        db.provider.select('core', 'sd_digests', { limit: 1, select: 'c_version, ba_file', sort: [{ property: "id", direction: "DESC" }], filter: filters }, null, function (data) {
            if (data.meta.success) {
                res.setHeader('Content-Disposition', 'attachment; filename=mobnius-vote.apk');
                res.setHeader("Content-Type", 'application/vnd.android.package-archive');
                res.send(data.result.records[0].ba_file);
            } else {
                res.send(data.meta.msg);
            }
        });
    });

    router.get("/version/:num", function (req, res) {
        var from = req.query.from;
        var filters = [{ property: "b_hidden", operator: "=", value: false }];
        if (from && from.toLowerCase() == 'release') {
            filters.push({ property: "c_version", operator: "like", value: '.3.' });
        }
        db.provider.select('core', 'sd_digests', { limit: 1, select: 'c_version, ba_file', sort: [{ property: "id", direction: "DESC" }], filter: filters }, null, function (data) {
            if (data.meta.success && data.result.total > 0) {
                res.setHeader("Content-Type", 'application/json');
                res.json({
                    version: data.result.records[0].c_version
                });
            } else {
                res.json({
                    version: '0.0.0.0'
                });
            }
        });
    });

    router.post("/version", function (req, res) {
        var files = req.files;

        var apkPath = join(__dirname, '../', 'public', "client.apk");
        fs.writeFile(apkPath, files["client"].data, function (err) {
            if (!err) {
                getApkVersion(apkPath, function (ver) {
                    db.provider.insert('core', 'sd_digests', {
                        c_version: ver,
                        c_description: '',
                        f_division: null,
                        c_app_name: 'android',
                        b_hidden: false,
                        ba_file: files["client"].data
                    }, function (data) {
                        if (data.meta.success) {
                            res.send("SUCCESS");
                        } else {
                            res.send(data.meta.msg);
                        }
                    });
                });
            } else {
                res.send(err);
            }
        });
    });

    /**
     * Возвращает версию apk
     * @param {string} apk путь к файлу
     * @param {function} callback функция обратного вызова. Возвращается версия
     */
    function getApkVersion(apk, callback) {
        fs.access(apk, function (err) {
            if (err) {
                if (typeof callback == 'function')
                    callback(null);
            } else {
                try {
                    var reader = apkReader.readFile(apk)
                    var manifest = reader.readManifestSync();
                    if (typeof callback == 'function')
                        callback(manifest.versionName, manifest);
                } catch (exc) {
                    if (typeof callback == 'function')
                        callback(null);
                }
            }
        });
    }

    return router;
}