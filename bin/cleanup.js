/**
 * Предназначен для принудительно закрытия подключения к серверу БД
 */
var logjs = require('../modules/log');

process.stdin.resume();//so the program will not close instantly

if (process.platform === "win32") {
    var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on("SIGINT", function () {
        process.emit("SIGINT");
    });
    rl.on("SIGUSR1", function () {
        process.emit("SIGINT");
    });
    rl.on("SIGUSR2", function () {
        process.emit("SIGINT");
    });
    rl.on("SIGTERM", function () {
        process.emit("SIGINT");
    });
}

function exitHandler(options, exitCode) {
    if(exitCode instanceof Error) {
        console.error(exitCode.stack);
    }
    if (options.cleanup) {
        var db = require('../modules/dbcontext');
        db.provider.db().close();
        logjs.debug('Подключение pg клиента закрыто.');
    }
    if (exitCode || exitCode === 0) {
        if(exitCode instanceof Error)
            throw exitCode;
        else
            throw new Error(exitCode);
    }
    if (options.exit) 
        process.exit();
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

process.on('SIGHUP', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));