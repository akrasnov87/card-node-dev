/**
 * @file router/upload.js
 * @project simple-rpc
 * @author Александр
 * @todo проверка для доступности сервера
 */

var express = require("express");
var router = express.Router();
var db = require('../modules/dbcontext');

module.exports = function () {
    router.get("/file", function (req, res) {
        var id = req.query.id;
        var filters = [{ property: "id", operator: "=", value: id }];

        db.provider.select('core', 'dd_files', { limit: 1, select: 'id, ba_foto', filter: filters }, null, function (data) {
            if (data.meta.success && data.result.records.length > 0) {
                res.setHeader('Content-Disposition', 'attachment; filename=' + id + '.jpg');
                res.setHeader("Content-Type", 'image/jpeg');
                res.send(data.result.records[0].ba_foto);
            } else {
                res.send(data.meta.msg);
            }
        });
    });

    router.post("/file", function (req, res) {
        var id = req.query.id;
        var files = req.files;

        db.provider.insertOrUpdate('core', 'dd_files', 'id', {
            id: id,
            ba_foto: files["foto"].data
        }, function (data) {
            if (data.meta.success) {
                res.send("SUCCESS");
            } else {
                res.send(data.meta.msg);
            }
        });
    });

    return router;
}