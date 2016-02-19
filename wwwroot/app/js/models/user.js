/** User difinition model */
var User = (function () {
    function User(email, password, login, name, secondName, passwordConfirm, mobilePhone, avatar, roles) {
        this.email = email;
        this.password = password;
        this.login = login;
        this.name = name;
        this.secondName = secondName;
        this.passwordConfirm = passwordConfirm;
        this.mobilePhone = mobilePhone;
        this.avatar = avatar;
        this.roles = roles;
    }
    User.getUserByRegisterModel = function (user) {
        var u = new User(user.email, user.password);
        u.companies = [new Company(user.companyName)];
        return u;
    };
    User.getUserByLoginModel = function (user) {
        return new User(user.email, user.password);
    };
    return User;
})();
exports.User = User;
var Company = (function () {
    function Company(name) {
        this.name = name;
        this.registerDate = new Date();
    }
    return Company;
})();
exports.Company = Company;
var ViewLoginModel = (function () {
    function ViewLoginModel() {
    }
    return ViewLoginModel;
})();
exports.ViewLoginModel = ViewLoginModel;
var ViewRegisterModel = (function () {
    function ViewRegisterModel() {
    }
    return ViewRegisterModel;
})();
exports.ViewRegisterModel = ViewRegisterModel;
var ViewChangePassword = (function () {
    function ViewChangePassword() {
    }
    return ViewChangePassword;
})();
exports.ViewChangePassword = ViewChangePassword;
//# sourceMappingURL=user.js.map