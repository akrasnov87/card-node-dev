/**
 * @file modules/rpc/router/cache.js
 * @project node-service
 * @author Александр
 */

var express = require('express');
var router = express.Router();

var cacher = require('../../cacher');

module.exports = function () {
    router.get('/cache/reload', get_cache_reload);

    return router;
}

/**
 * GET запрос для сброса кеша
 * @param {*} req 
 * @param {*} res 
 * @example
 * GET ~/cache/reload
 */
function get_cache_reload(req, res) {
    cacher.reload();
    res.send('SUCCESS');
}