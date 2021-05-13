/**
 * @file router/exists.js
 * @project node-service
 * @author Александр
 * @todo проверка для доступности сервера
 */

var express = require("express");
var router = express.Router();
var db = require('../modules/dbcontext');
const nodemailer = require('nodemailer');
var shell = require('../modules/custom-context/shell').shell;
var result_layout = require('mobnius-pg-dbcontext/modules/result-layout');

module.exports = function () {
    router.get("/", reset);
    return router;
}

/**
 * сброс пароля
 * @param {*} req 
 * @param {*} res 
 * @example
 * GET ~/reset?name=
 */
function reset(req, res) {
    var name = req.query.name;
    let transporter = nodemailer.createTransport({
        auth: {
            user: 'a-krasnov@it-serv.ru',
            pass: 'Max$ecurity6'
        },
        host: 'smtp.yandex.ru',
        port: 465,
        secure: true
    });

    db.pv_users().Query({
        filter: [{
            property: 'c_login',
            value: name
        }, 'OR', {
            property: 'c_email',
            value: name
        }]
    }, function (data) {
        if (data.meta.success == false || data.result.total == 0) {
            res.json(result_layout.error(new Error("Совпадений не найдено.")));
        } else {
            var data = data.result.records[0];
            if (data.c_email) {
                shell().saltHash({ "params": [{ "password": "qwe-123", "selection": [data.id] }] }, function (r) {
                    if (r.meta.success) {
                        transporter.sendMail({
                            from: 'a-krasnov@it-serv.ru',
                            to: data.c_email.replace(/\;/gi, ', '),
                            subject: "Восстановление пароля",
                            text: "По запросу был сгенерирован новый пароль",
                            html: "qwe-123"
                        }, function (err, info) {
                            if (err) {
                                res.json(result_layout.error(err));
                            } else {
                                res.json(result_layout.ok([info]));
                            }
                        });
                    } else {
                        res.json(result_layout.error(new Error("Ошибка при генерации нового пароля.")));
                    }
                });
            } else {
                res.json(result_layout.error(new Error("Адрес электронной почты не найден.")));
            }
        }
    });
}