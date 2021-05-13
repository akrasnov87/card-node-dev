var fs = require('fs');
var ejs = require('ejs');
var join = require('path').join;

var reader = require('mobnius-schema-reader');
var conf = require('node-config')(join(__dirname, '../'));
var args = require("args-parser")(process.argv);
require('./cleanup');
var moment = require('moment');

module.exports = function (callback) {
    reader({
        connectionString: args.connection_string || conf.get('connectionString'),
        autoRemove: true,
        schemaList: ["'core'", "'dbo'", "'rpt'"],
        schemaReference: join(__dirname, '../', 'schema.reference'),
        output: join(__dirname, '../', 'schema', args.port.toString())
    }, function (schemas) {
        Date.prototype.toJSON = function () { return moment(this).format('YYYY-MM-DDTHH:mm:ss.SSSZZ'); }

        global.schemas = schemas;
        var path = join(__dirname, '../', './modules/dbcontext.js');

        var template = ejs.compile(fs.readFileSync(join(__dirname, './dbcontext')).toString());
        var content = template({
            items: schemas.tables
        });

        fs.writeFileSync(path, content);
        console.log('генерация завершена.');
        if (typeof callback == 'function')
            callback();
    });
}