/**
 * @file modules/rpc/index.js
 * @project node-service
 * @author Александр
 */

var express = require('express');
var router = express.Router();

var auditRouter = require('../system-logs/router/audit');
var authUtil = require('../authorize/util');
var shellContext = require('../custom-context/shell');
var notificationContext = require('../custom-context/notification');
var settingContext = require('../custom-context/setting');
var userContext = require('../custom-context/user');
var changePasswordRouter = require('./router/changePassword');
var rpcRouter = require('./router/rpc');
var cacheRouter = require('./router/cache');
var socket = require('../socket/main');
var userRouter = require('./router/user');
var rpcInjection = require('../rpc-injection');
var rpcQuery = require('./modules/rpc-query');
var attachmentContext = require('../../modules/attachment-context');
var fileContext = require('../../modules/file-context');
var db = require('../dbcontext');

/**
 * инициализация модуля для работы с RPC
 * @param {string} auth_type тип авторизации. По умолчанию basic
 */
module.exports = function (auth_type) {
    var contexts = [];

    // добавляем injection
    rpcInjection.add('accesses', require('../injections/accesses').reload);

    contexts.push(shellContext);
    contexts.push(notificationContext);
    contexts.push(userContext);
    contexts.push(settingContext);
    contexts.push(attachmentContext);
    contexts.push(fileContext);

    rpcQuery.registryContext(db);
    rpcQuery.registryContext(contexts);

    router.use(userRouter());
    router.use(cacheRouter());
    router.use(changePasswordRouter(auth_type));

    router.use(auditRouter(auth_type));
    router.use(rpcRouter(auth_type));

    socket.init(auth_type);

    var authType = authUtil.getAuthModule(auth_type);
    router.post('/auth', authType.authorize);

    return router;
}