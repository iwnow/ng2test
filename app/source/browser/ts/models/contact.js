"use strict";
var Contact = (function () {
    function Contact() {
    }
    Object.defineProperty(Contact.prototype, "avatar", {
        get: function () {
            return this._avatar || 'img/user-pic-tmp.png';
        },
        set: function (val) {
            this._avatar = val;
        },
        enumerable: true,
        configurable: true
    });
    return Contact;
}());
exports.Contact = Contact;
