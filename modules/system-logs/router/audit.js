/**
 * @file modules/system-logs/router/audit.js
 * @project node-service
 * @author Александр
 * @todo Требуется авторизация пользователя
 */

var express = require('express');
var router = express.Router();
var join = require('path').join;
var fs = require('fs');
var util = require('../index');
var logjs = require('../../log');
var authUtil = require('../../authorize/util');

module.exports = function (auth_type) {
    var authType = authUtil.getAuthModule(auth_type);
    router.use('/audit', authType.user(true));

    router.get('/audit/scripts.js', get_scripts);

    router.post('/audit/receiver', post_receiver);

    return router;
}

/**
 * GET запрос на получение скрипта для отправки аудита
 * @param {*} req 
 * @param {*} res 
 * @example
 * GET ~/audit/scripts.js
 */
function get_scripts(req, res) {
    res.setHeader("Content-Type", "application/javascript");

    var filePath = join(__dirname, '../', 'resources', 'audit-scripts.js');
    if (fs.existsSync(filePath))
        res.sendFile(filePath);
    else {
        var message = 'FAIL: audit script not found';
        logjs.error('Ошибка генерации скрипта аудита. ' + message);
        res.send(message);
    }
}

/**
 * POST запрос на принятия данных
 * @param {*} req 
 * @param {*} res 
 * @example
 * POST ~/audit/receiver
 * Body
 * [{
 *      type: '',
 *      message: ''
 * }]
 * @todo если результат будет положительный, то вернется строка SUCCESS, если нет, то строка будет содержать FAIL
 */
function post_receiver(req, res) {
    if (res.isAuthorize == true) {
        try {
            var userId = '';
            var items = req.body;
            if (Array.isArray(items)) {
                items.forEach(function (item) {
                    if (item.c_type || item.c_data) {
                        userId = item.fn_user || res.user.id;
                        util.audit(userId, item.d_date || new Date(), item.c_data, item.с_type, item.с_app_name);
                    }
                });
            }
            logjs.debug('Клиент ' + userId + ' передал данные об аудите.');
            res.send('SUCCESS');
        } catch (exc) {
            logjs.error('Ошибка получения аудита ' + exc.toString());
            res.send('FAIL: ' + exc.toString());
        }
    } else {
        res.send('FAIL: not authorize');
    }
}