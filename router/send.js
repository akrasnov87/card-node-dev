var express = require("express");
var router = express.Router();
var logjs = require('../modules/log');
var mailer = require('../modules/socket/mailer');
var db = require('../modules/dbcontext');
var rpcUtil = require('../modules/rpc/util');
var packager = require('mobnius-packager/index-v2');
var userCollection = require('../modules/socket/connection-stack');

module.exports = function (auth_type) {
    //http://localhost:3000/vote/dev/send?to=180101&from=5&message=Hello&rpc-authorization=cm9vdDpyb290MA==
    router.get("/", function (req, res, next) {
        var to = req.query.to;
        var from = req.query.from;
        var group = req.query.group;
        var message = req.query.message;
        var jb_data = req.query.data || null;

        if (!to || !from || !message) {
            res.send("FAIL. Отправитель, получатель либо текст сообщения не указаны.");
        } else {
            logjs.debug('Отправка уведомления через HTTP-протокол. Отправитель ' + from + ', Получатель ' + to);
            res.user = { c_login: 'root', id: 1 };
            mailer.sendText(req, res, {
                fn_user_to: parseInt(to),
                fn_user_from: parseInt(from),
                c_group: group,
                c_message: message,
                jb_data: jb_data,
                c_title: 'Уведомление',
                d_date: new Date()
            });

            res.send('SUCCESS');
        }
    });

    router.get("/check", function (req, res, next) {
        res.send('SUCCESS');
    });

    // массовай рассылка сообщений
    //http://localhost:3000/vote/dev/send/push?rpc-authorization=cm9vdDpyb290MA==
    router.get("/push", function (req, res) {
        db.cd_notifications().Query({
            select: 'fn_user_to, fn_user_from, c_group, c_message, d_date',
            filter: [{ "property": "b_sended", "value": false }],
            sort: [{ "property": "d_date", "direction": 'DESC' }]
        }, function (data) {
            if (data.meta.success) {
                if (data.result.total > 0) {
                    var records = data.result.records;
                    logjs.debug('Отправка уведомления через HTTP-протокол. ' + data.result.total + ' шт.');
                    res.user = { c_login: 'root', id: 1 };

                    var box = {length:0};

                    for(var i = 0; i < records.length; i++) { 
                        var record = records[i]; 
                        if(!box[record.fn_user_to]) {
                            box[record.fn_user_to] = [];
                            box.length++;
                        }
                        box[record.fn_user_to].push(record);
                    }

                    for(var i in box) { 
                        if(i == 'length') {
                            continue;
                        }
                        var records = box[i]; 
                        var record = records[0];

                        var users = userCollection.getUsers(record.fn_user_to);
                        if (users.length > 0) { 

                            // обновление уведомлений
                            db.provider.db().query('update core.cd_notifications set b_sended = true where fn_user_to = $1 and b_sended = false;', [record.fn_user_to], function (err, rows, time, options) {
                                if (err) {
                                    logjs.error(err.toString());
                                } 
                            });

                            var pkg = packager.write();
                            pkg.meta(false, 'mail', 'v2', Date.now().toString());

                            var items = [];
                            if(records.length > 4) {
                                var item = {
                                    fn_user_to: record.fn_user_to,
                                    fn_user_from: res.user.id,
                                    c_group: '',
                                    c_message: 'Для Вас доступно ' + records.length + ' сообщений',
                                    jb_data: null,
                                    c_title: 'Уведомление',
                                    d_date: record.d_date
                                };
                            } else {
                                for(var r in records) {
                                    var rec = records[r];
                                    var item = {
                                        fn_user_to: rec.fn_user_to,
                                        fn_user_from: rec.fn_user_from,
                                        c_group: '',
                                        c_message: rec.c_message,
                                        jb_data: null,
                                        c_title: 'Уведомление',
                                        d_date: rec.d_date
                                    };
                                    items.push(item);
                                }
                            }

                            pkg.blockTo('to0', { action: 'cd_notifications', method: 'Add', data: [items], tid: 0, type: 'rpc' });
                            pkg.blockFrom('from0', {
                                    "meta":{"success":true,"msg":"ok"},
                                    "code":200,
                                    "result":{"records":items,"total":1},
                                    "time":7,
                                    "tid":0,"type":"rpc","method":"Add","action":"cd_notifications","rpcTime":10});

                            for (var j = 0; j < users.length; j++) {
                                var user = users[j];
                                user.emit('mailer-from', pkg.flush(0, 'ZIP'));
                            }
                        }
                    }

                    res.send('SUCCESS (' + data.result.total + ')');
                } else {
                    res.send('SUCCESS');
                }
            } else {
                rpcUtil.failResponse(res, data.meta.msg);
            }
        })
    });

    return router;
}