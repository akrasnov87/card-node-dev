/**
 * @file router/download.js
 * @project node-service
 * @author Александр
 * @todo скачивание файла с сервера 
 */

var express = require('express');
var router = express.Router();
var join = require('path').join;
var fs = require('fs');
var args = require("args-parser")(process.argv);

module.exports = function (auth_type) {
    router.get('/:name', function(req, res) {
        var filePath = join((args.download || join(__dirname, '../')), 'download', req.params.name);

        res.download(filePath);   
    });

    /**
     * Получение списка файлов в папке download
     * @example 
     * 
     * GET ~/download
     */
    router.get('/', function(req, res) {
        var dir = join((args.download || join(__dirname, '../')), 'download');
        fs.readdir(dir, function(err, files) {
            var results = [];
            for(var i in files) {
                var file = files[i];
                results.push({ name: file, size: fs.statSync(join(dir, file)).size });
            }
            
            res.json(results);
        });
    });

    return router;
}