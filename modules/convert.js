var moment = require('moment');

var DATE_FORMAT = 'YYYY-MM-DDTHH:mm:ss';

/**
 * Преобразование во вложение для моб. устройства
 * @param {any} dbItem результат из БД
 * @returns объект
 */
exports.toMobileAttachment = function(dbItem) {
    return {
        id: dbItem.id,
        fn_result: dbItem.fn_result,
        fn_type: dbItem.fn_type,
        fn_file: dbItem.fn_file,
        fn_route: dbItem.fn_route,
        fn_point: dbItem.fn_point,
        n_longitude: dbItem.n_longitude,
        n_latitude: dbItem.n_latitude,
        c_notice: dbItem.c_notice,
        d_date: moment(dbItem.d_date).format(DATE_FORMAT) + '.000Z',
        jb_data: dbItem.jb_data,
        c_name: dbItem.c_name,
        dx_created: dbItem.dx_created,
        fn_user: dbItem.fn_user,
        folder: "attachments" // специальная папка по умолчанию
    }
}

/**
 * Преобразование в файл для мо. устройства
 * @param {any} dbItem результат из БД
 * @returns объект
 */
exports.toMobileFile = function(dbItem){
    return {
        id: dbItem.id,
        c_name: dbItem.c_name,
        c_mime: dbItem.c_mime,
        c_extension: dbItem.c_extension,
        d_date: moment(dbItem.d_date).format(DATE_FORMAT) + '.000Z',
        n_size: dbItem.n_size,
        jb_data: dbItem.jb_data,
        dx_created: dbItem.x_created,
        fn_user: dbItem.fn_user,
        folder: "files" // специальная папка по умолчанию
    };
}