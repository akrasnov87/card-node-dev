var STORAGE_NAME = 'audits_buffers';

if (!localStorage.getItem(STORAGE_NAME))
    localStorage.setItem(STORAGE_NAME, JSON.stringify([]));

function buffers() {
    var buffers = [];
    this.push = function (item) {
        buffers.push(item);
    }
    this.flush = function () {
        var items = JSON.parse(localStorage.getItem(STORAGE_NAME));
        buffers.forEach(function (item) {
            items.push(item);
        });
        localStorage.setItem(STORAGE_NAME, JSON.stringify(items));
    }
    this.clear = function () {
        localStorage.setItem(STORAGE_NAME, JSON.stringify([]));
    }
    this.get = function () {
        return JSON.parse(localStorage.getItem(STORAGE_NAME));
    }
    return this;
}

function __audit(options) {
    options = options || {};
    var _buffers = new buffers();
    var BUFFER_SIZE = options.bufferSize || 25;
    var app_id = options.app_id || 'unknow';
    var timer = null;

    this.many = function (items) {
        items.forEach(function (item) {
            if (item.message && item.type) {
                _buffers.push({
                    c_data: item.message,
                    c_type: item.type,
                    d_date: new Date(),
                    fn_user: options.userId,
                    c_app_name: app_id
                });
            }

            _buffers.flush();
        });
        send();
    }

    this.single = function (type, message) {
        _buffers.push({
            c_data: message,
            c_type: type,
            d_date: new Date(),
            fn_user: options.userId,
            c_app_name: app_id
        });
        _buffers.flush();
        send();
    }

    function send() {
        var items = _buffers.get();
        if (BUFFER_SIZE < items.length) {
            request();
        }
        if (!timer) {
            timer = setTimeout(function () {
                clearTimeout(timer);
                timer = null;
                if (items.length > 0) {
                    request();
                }
            }, 10000);
        }
    }

    function request(callback) {
        var url = options.baseUrl;
        if (!url) {
            return console.error('audit send URL not found');
        }
        var absoluteUrl = options.absoluteUrl || '/audit/receiver';

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url + absoluteUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('RPC-Authorization', options.token);
        var items = _buffers.get();
        _buffers.clear();
        xhr.send(JSON.stringify(items));

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            if (xhr.status != 200 || xhr.responseText.indexOf('FAIL') == 0) {
                items.forEach(function (item) {
                    _buffers.push(item);
                });
                _buffers.flush();
            }

            if (typeof callback == 'function')
                callback();
        }
    }
    send();
    return this;
}