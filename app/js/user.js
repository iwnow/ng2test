var User = (function () {
    function User(Age, Name) {
        this.Age = Age;
        this.Name = Name;
    }
    User.prototype.info = function () {
        return "Name: " + this.Name + ", Age: " + this.Age;
    };
    return User;
})();
exports.User = User;
//# sourceMappingURL=user.js.map