/** User difinition model */
var User = (function () {
    function User(email, password, login, name, secondName, passwordConfirm, mobilePhone, avatar, isAuthorized, roles) {
        this.email = email;
        this.password = password;
        this.login = login;
        this.name = name;
        this.secondName = secondName;
        this.passwordConfirm = passwordConfirm;
        this.mobilePhone = mobilePhone;
        this.avatar = avatar;
        this.isAuthorized = isAuthorized;
        this.roles = roles;
    }
    return User;
})();
exports.User = User;
//# sourceMappingURL=user.js.map