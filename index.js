/**
 * @file /index.js
 * @project node-service
 * @author Александр
 */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cors = require('cors');
var join = path.join;
var fileManager = require('mobnius-rpc-file-manager');
var fileUpload = require('express-fileupload');
var db = require('./modules/dbcontext');
var rpc = require('./modules/rpc/index');
var exists = require('./router/exists');
var reset = require('./router/reset.js');
var upload = require('./router/upload');
var logjs = require('./modules/log');
var utils = require('./modules/utils');
var fs = require('fs');
var catalogUtil = require('./modules/catalog-util');
var args = require("args-parser")(process.argv);
var keygen = require('./modules/authorize/keygen');

var app = express();
var vPath = utils.getVirtualDirPath();
app.set('vPath', vPath);

// view engine setup
app.set('root', __dirname);
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);

app.use(cors());

app.use(fileUpload());

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

/**
 * лимит для обработки JSON установлен в 100mb
 */
app.use(express.json({
    limit: '100mb'
}));

/**
 * лимит для обработки JSON установлен в 100mb
 */
app.use(express.urlencoded({
    limit: '100mb',
    extended: true
}));

app.use(vPath + '/', express.static(join(__dirname, 'public')));

app.use(vPath + '/', express.static(join(__dirname, 'files')));

app.use(vPath, rpc('basic'));
app.use(vPath, require('./router/synchronization')('basic'));
app.use(vPath + '/file', require('./router/filer')('basic'));
app.use(vPath + '/send', require('./router/send')('basic'));

// настройки файлового менеджера
app.use(vPath + '/file-manager', fileManager(join(__dirname, 'public'), db));

// проверка на доступность сервера
app.use(vPath + '/exists', exists());
app.use(vPath + '/reset', reset());
app.use(vPath + '/upload', upload());

// connect
app.use(vPath + '/connect', require('./router/connect')('basic'));

app.get(vPath + '/activate', function(req, res) {
    keygen.writeKey(req.query.key);
    res.send('OK');
});

app.use(vPath + '/download', function (request, response) {
    response.redirect(vPath + '/upload/version-file');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    var statusCode = err.status || 500;
    res.status(statusCode);
    res.render('error');
    if (req.url != '/json') {
        logjs.error('statusCode: ' + statusCode + '. URL: ' + req.url + '. Message: ' + err.message)
    }
});

// удаление старых каталогов
if (!args.not_remove_files && !fs.existsSync(join(__dirname, 'files'))) {
    fs.mkdirSync(join(__dirname, 'files'));
}

if (!args.not_remove_files) {
    var nTimeLine = 24 * 60 * 60 * 1000;
    var nDay = 1;
    catalogUtil.removeLastDirs(join(__dirname, 'files'), nDay);
    setInterval(function () {
        catalogUtil.removeLastDirs(join(__dirname, 'files'), nDay);
    }, nTimeLine);
}

/**
 * приложение express
 */
module.exports = app;