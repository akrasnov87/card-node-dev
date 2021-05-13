/**
 * @file modules/rpc/router/changePassword.js
 * @project node-service
 * @author Александр
 * @todo выполняется только для авторизированных пользователей
 */

var express = require('express');
var router = express.Router();

var authorizeDb = require('../../authorize/authorization-db');
var shellUtil = require('../util');
var authUtil = require('../../authorize/util');

module.exports = function (auth_type) {
    var authType = authUtil.getAuthModule(auth_type);
    router.use('/changePassword', authType.user(false));

    router.post('/changePassword', post_changePassword);

    return router;
}

/**
 * POST запрос на изменение пароля пользователя. Выполняется только авторизованным пользователем
 * @param {*} req 
 * @param {*} res 
 * @example
 * POST ~/changePassword
 * Body
 * {
 *      password: string,
 *      newPassword: string
 * }
 */
function post_changePassword(req, res) {
    if (res.isAuthorize == true) {
        var login = res.user.c_login;
        var password = req.body.password;

        authorizeDb.getUser(login, password, function (user) {
            if (user && user.id > 0) {
                password = req.body.newPassword;
                if (password) {
                    login = user.c_login;
                    authorizeDb.passwordReset(login, password, function (err, pswData) {
                        if (err) {
                            return shellUtil.failResponse(res, 'Ошибка изменения пароля пользователя.', err.toString());
                        }

                        res.json({
                            meta: {
                                success: true,
                                msg: ''
                            },
                            result: 'Пароль пользователя изменен. Подробная информация выслана на Ваш почтовый ящик.'
                        });
                    });
                } else {
                    shellUtil.failResponse(res, 'Новый пароль пользователя не найден.');
                }
            } else {
                shellUtil.failResponse(res, 'Ошибка авторизации пользователя.');
            }
        });

    } else {
        shellUtil.failResponse(res, 'Пользователь не авторизован.');
    }
}