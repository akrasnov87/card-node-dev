/**
 * @file modules/authorize/saltHash.js
 * @project node-service
 * @author Александр
 */

var crypto = require('crypto');
var util = require('../rpc/util');

/**
 * генрация salt и hash для пароля
 * @param {string} psw пароль
 * @returns {any}
 * @example
 * var pswData = generate('пароль');
 * console.log(pswData.salt); // salt
 * console.log(pswData.passwordHash); // hash
 */
exports.generate = function (psw) {
    var salt = util.genRandomString(16);
    var passwordData = sha512(psw, salt);
    return passwordData;
}

/**
 * Проверка на совпадение пароля
 * @param {string} psw пароль
 * @param {string} salt salt
 * @param {string} hash hash
 * @returns {boolean}
 * @example
 * if(check('пароль', salt, hash) == true) {
 *      // проверка паролей
 * }
 */
exports.check = function (psw, salt, hash) {
    var passwordData = sha512(psw, salt);
    return passwordData.passwordHash == hash;
}

/**
 * hash password with sha512.
 * @private
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512(password, salt) {
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
}