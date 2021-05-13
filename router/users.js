/**
 * @file router/users.js
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
    var results = connectionStack.getUsers();
    var users = [];
    for(var r in results) {
        var item = results[r];
        users.push({
            id: item.user.id,
            c_login: item.user.c_login,
            c_first_name: item.user.c_first_name,
            c_last_name: item.user.c_last_name,
            c_middle_name: item.user.c_middle_name,
            c_claims: item.user.c_claims,
            c_all_divisions: item.user.c_all_divisions,
            c_version: item.user.c_version,
            n_version: item.user.n_version,
            socket_id: item.id
        });
    }
    res.json(result_layout.ok(users));
}