"use strict";
var Validators = (function () {
    function Validators() {
    }
    Validators.emailValidate = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    Validators.passwordValidate = function (pass) {
        return pass.length > 3;
    };
    return Validators;
}());
exports.Validators = Validators;
