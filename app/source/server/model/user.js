"use strict";
class User {
    constructor(email, password, login, name, secondName, passwordConfirm, mobilePhone, avatar, roles) {
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
}
exports.User = User;
class Company {
    constructor(name) {
        this.name = name;
        this.registerDate = new Date();
    }
}
exports.Company = Company;
//# sourceMappingURL=user.js.map