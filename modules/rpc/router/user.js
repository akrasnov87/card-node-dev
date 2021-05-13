/**
 * @file modules/rpc/router/user.js
 * @project node-service
 * @author Александр
 */

var express = require('express');
var router = express.Router();
var shellUtil = require('../util');
var db = require('../../dbcontext');

module.exports = function () {
    router.get('/user', get_user);
    return router;
}

/**
 * GET запрос для получения информации о пользователе
 * @param {*} req 
 * @param {*} res 
 * @example
 * GET ~/user?username=[name],
 * где name - логин пользователя
 */
function get_user(req, res) {
    var username = req.query.username;
    if (username) {
        db.getUser(username, function (data) {
            if (data.meta.success == true) {
                var user = data.result.records[0];
                if (user) {
                    var obj = {
                        login: user.c_login,
                        description: user.c_description,
                        icon_fileimage: user.c_icon_fileimage
                    };
                    shellUtil.successResponse(res, obj);
                } else {
                    shellUtil.failResponse(res, 'Не удалось найти пользователя.');
                }
            } else {
                shellUtil.failResponse(res, data.meta.msg);
            }
        });
    } else {
        shellUtil.failResponse(res, 'Логин пользователя не передан. ?username=[name]');
    }
}