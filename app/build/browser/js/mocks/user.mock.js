"use strict";
var user_1 = require('../models/user');
var UserMock = (function () {
    function UserMock() {
    }
    UserMock.Create = function () {
        var u = new user_1.User('mock@mock.com', 'q', 'mockLogin', 'mock', 'mock mock', 'q', '89638123462', null, ['mock']);
        u.companies = [new user_1.Company('Github')];
        return u;
    };
    return UserMock;
}());
exports.UserMock = UserMock;
