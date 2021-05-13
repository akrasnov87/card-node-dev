/**
 * @file router/connect.js
 * @project node-service
 * @author Александр
 * @todo Получение списка подключенных пользователей
 */

var express = require('express');
var router = express.Router();

var authUtil = require('../modules/authorize/util');
var connectionStack = require('../modules/socket/connection-stack');
var result_layout = require('mobnius-pg-dbcontext/modules/result-layout');

module.exports = function (auth_type) {
    var authType = authUtil.getAuthModule(auth_type);
    router.use('/', authType.user(false));

    router.get('/', getUsers);

    return router;
}

/**
 * Получение списка подключенных пользователей
 * @param {*} req 
 * @param {*} res 
 * @example
 * GET ~/users
 */
function getUsers(req, res) {
    var utils = require('../modules/utils');

    var results = connectionStack.getUsers();
    var users = [];
    for(var r in results) {
        var item = results[r];
        users.push({
            id: item.user.id,
            c_login: item.user.c_login,
            c_claims: item.user.c_claims,
            c_version: item.user.c_version
        });
    }

    var data = { 
        url: req.headers.host,
        token: req.query['rpc-authorization'], 
        vPath: utils.getVirtualDirPath(),
        items: users };

    res.render('connect', data)
}