var fs = require('fs');
var join = require('path').join;
var keyPath = join(__dirname, '../', '../', 'public', 'key');
var pkg = require(join('../', '../', 'package.json'));

exports.writeKey = function(key) {
    fs.writeFileSync(keyPath, key);
}

exports.check = function() {
    var data = pkg.version.split('.');
    if(fs.existsSync(keyPath)) {
        try {
            var key = fs.readFileSync(keyPath).toString();
            var items = key.split('-');
            if(items[0].indexOf(data[0]) >= 0 && items[1].indexOf(data[1]) >= 0 && items[2].indexOf(data[2]) >= 0) {
                return true;
            }
        }catch(e) {
            return false;
        }
    }
    
    
    var birthday = new Date(pkg.birthday);
    birthday.setDate(birthday.getDate() + parseInt(data[1]) + 30);

    if(Date.now() > birthday.getTime()) {
        return undefined;
    } else {
        return false;
    }
}