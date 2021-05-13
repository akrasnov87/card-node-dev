/**
 * @file modules/authorize/basic-authorize.js
 * @project node-service
 * @author Александр
 * @todo базовый механизм авторизации. Логин и пароль шифруются как base64 строка
 */

var authorizeDb = require('./authorization-db');
var join = require('path').join;
var conf = require('node-config')(join(__dirname, '../'));
var logjs = require('../log');
var db = require('../dbcontext');

/**
 * установка текущего пользователя
 * @param {boolean} skip false - пользователь не авторизован и выдавать сразу код 401
 * @returns {function}
 */
exports.user = function (skip) {
    skip = skip == undefined ? false : skip;
    return function (req, res, next) {
        var data = req.headers[conf.get('authorization_header')] || req.query[conf.get('authorization_header')];
        if (data) {
            var userInfo = [];
            if (data.indexOf('OpenToken ') == 0) {
                var token = data.replace('OpenToken ', '');
                userInfo = token.split(':');
            } else {
                var token = data.replace('Token ', '');
                userInfo = Buffer.from(token, 'base64').toString().split(':');
            }
            var UserName = userInfo[0];
            var Password = userInfo[1];

            authorizeDb.getUser(UserName, Password, function (user) {

                res.user = user;
                res.isAuthorize = user.id != -1;
                if (!res.isAuthorize) {
                    if (skip == true) {
                        next();
                    } else { // если пользователь не авторизован, то выдавать сразу код 401
                        res.json({
                            code: 401,
                            meta: {
                                success: false
                            }
                        });
                    }
                } else {
                    next();
                }
            });

        } else {
            if (skip == true) {
                res.user = Object.assign({
                    id: -1,
                    c_claims: '',
                    c_login: 'none'
                });
                res.isAuthorize = false;
                next();
            } else {
                res.json({
                    code: 401,
                    meta: {
                        success: false
                    }
                });
            }
        }
    }
}

/**
 * проверки авторизации пользователя
 */
exports.authorize = function (req, res) {
    var UserName = req.body.UserName;
    var Password = req.body.Password;
    var Version = req.body.Version || '0.0.0.0';

    authorizeDb.getUser(UserName, Password, function (user) {
        if (user.id == -1) {
            logjs.debug('Пользователь ' + UserName + " не авторизован.");
            res.json({
                code: 401,
                meta: {
                    success: false,
                    msg: 'Логин или пароль введены не верно.'
                }
            });
        } else {
            if (user.c_version != Version) {
                db.provider.db().query('update core.pd_users set c_version = $1 where id = $2', [Version, user.id], function (err, rows) {
                    setResponse();
                });
            } else {
                setResponse();
            }

            function setResponse() {
                res.json({
                    token: Buffer.from(UserName + ':' + Password).toString('base64'),
                    user: {
                        userId: user.id,
                        claims: user.c_claims,
                        userName: user.c_user_name,
                        disabled: user.b_disabled
                    }
                });
            }
        }
    });
}