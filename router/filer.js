/**
 * @file router/filer.js
 * @project node-service
 * @author Александр
 * @todo Позволяет получать файла по ссылке
 */

var db = require("../modules/dbcontext");
var express = require("express");
var router = express.Router();
var pth = require('path');
var mime = require('mime-types');
var rpcUtil = require('../modules/rpc/util');

module.exports = function (auth_type) {
    router.get("/attachment", getAttachment);
    router.get("/", getFile);
    router.post("/", saveFile);
    router.get("/attachments", getAttachments);
    return router;
}

/**
 * Получить файл из БД. Таблица core.cd_files
 * @param {*} req 
 * @param {*} res 
 * @example
 * GET ~/?id=[идентификатор файла]
 */
function getFile(req, res) {
    var id = req.query.id;
    if (!id) {
        return rpcUtil.failResponse(res, "Параметр id (идентификатор файла) не найден.");
    }
    db.cd_files().Query({
        select: 'ba_data, c_mime',
        filter: [{ "property": "id", "value": id }]
    }, function (data) {
        if (data.meta.success) {
            if (data.result.total == 0) {
                rpcUtil.failResponse(res, "Результат не найден.");
            } else {
                var rec = data.result.records[0];
                res.setHeader("Content-Type", rec.c_mime);
                res.status(200).send(rec.ba_data);
            }
        } else {
            rpcUtil.failResponse(res, data.meta.msg);
        }
    });
}

/**
 * Получить вложения из БД. Таблица core.cd_attachments
 * @param {*} req 
 * @param {*} res 
 * @example
 * GET ~/attachment?id=[идентификатор вложения]
 * или
 * GET ~/attachment?id=[идентификатор вложения]&type=preview
 */
function getAttachment(req, res) {
    var id = req.query.id;
    if (!id) {
        return rpcUtil.failResponse(res, "Параметр id (идентификатор файла) не найден.");
    }
    db.provider.select('core', 'cf_mui_cd_attachment()', {
        params: [id]
    }, null, function (data) {
        if (data.meta.success) {
            if (data.result.total == 0) {
                rpcUtil.failResponse(res, "Результат не найден.");
            } else {
                var rec = data.result.records[0];
                if (req.query.type == 'preview' && rec.ba_data) {
                    res.setHeader("Content-Type", "image/jpeg");
                    return res.status(200).send(rec.ba_data);
                } else {
                    res.setHeader("Content-Type", rec.c_mime);
                    return res.status(200).send(rec.ba_file);
                }
            }
        } else {
            rpcUtil.failResponse(res, data.meta.msg);
        }
    });
}

/**
 * Получение списка вложений
 * @param {*} req 
 * @param {*} res 
 * @example
 * GET ~/attachments?result_id=[идентификатор результата]
 */
function getAttachments(req, res) {
    var result_id = req.query.result_id;
    if (!result_id) {
        return rpcUtil.failResponse(res, "Параметр result_id не найден.");
    }
    db.cd_attachments().Query({
        select: 'id, d_date, n_longitude, n_latitude, fn_result___fn_user_point',
        filter: [{
            property: "fn_result",
            value: result_id
        }],
        sort: [{
            property: 'd_date',
            direction: 'DESC'
        }]
    }, function (items) {
        if (items.meta.success) {
            if (items.result.records.length > 0) {
                var results = [];
                items.result.records.forEach(function (record) {
                    results.push({
                        id: record.id,
                        d_date: record.d_date,
                        n_longitude: record.n_longitude,
                        n_latitude: record.n_latitude,
                        fn_user_point: record.fn_result___fn_user_point,
                        c_uri: '/file/attachment?id=' + record.id
                    });
                });
                rpcUtil.successResponse(res, results);
            } else {
                rpcUtil.successResponse(res, []);
            }
        } else {
            rpcUtil.failResponse(res, items.meta.msg);
        }
    });
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Загрузка файла на сервер
 * @param {*} req req.files.file
 * @param {*} res 
 * @example
 * URL: POST /file
 * 
 * Имя ключа должно быть file. Имя файла должно быть с расширением
 * file=readme.txt
 * Результат:
 * {
    "meta": {
        "success": true,
        "msg": "ok"
    },
    "code": 200,
    "result": {
        "records": [
            "a610f80f-57ee-4b9e-8f5e-7b7dc84dbd14"
        ]
    }
  }
 */
function saveFile(req, res) {
    var file = req.files.file;
    if (file) {
        var item = {
            id: uuidv4(),
            c_name: pth.basename(file.name).replace(pth.extname(file.name), ''),
            d_date: new Date(),
            c_mime: mime.lookup(pth.extname(file.name)),
            c_extension: pth.extname(file.name)
        };

        item.ba_data = file.data;
        item.n_size = file.data.byteLength;
        db.provider.insert('core', 'cd_files', item, function (args) {
            // нужно отправлять только те файлы которые были обработаны.
            if (!args.meta.success) {
                rpcUtil.failResponse(res, "Ошибка сохранения файла " + item.c_name + " " + args.meta.msg);
            } else {
                rpcUtil.successResponse(res, [item.id]);
            }
        });
    } else {
        rpcUtil.failResponse(res, "Вложенный файл не найден");
    }
}