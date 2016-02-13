var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//external modules
var core_1 = require('angular2/core');
var Observable_1 = require('rxjs/Observable');
var Models = require('../models/all');
//mock objects for tests
var user_mock_1 = require('../mocks/user.mock');
var UserService = (function () {
    function UserService() {
        this._currentUser = null;
        this._registered = new Map();
        var u = user_mock_1.UserMock.Create();
        this._registered.set(u.email, u);
    }
    UserService.prototype.getUserInfo = function () {
        return this._currentUser;
    };
    UserService.prototype.logOut = function () {
        this._currentUser = null;
    };
    UserService.prototype.logIn = function (user) {
        var _this = this;
        var u = Models.User.getUserByLoginModel(user);
        return Observable_1.Observable.fromPromise(new Promise(function (resolve) {
            setTimeout(function () {
                var r;
                if (!_this._registered.has(u.email)) {
                    r = { result: false, reason: 'login failed' };
                }
                else {
                    var pass = _this._registered.get(u.email).password;
                    if (pass == u.password) {
                        r = { result: true };
                        _this._currentUser = u;
                        console.log("success loged user " + _this._currentUser.email);
                    }
                    else
                        r = { result: false, reason: 'login failed' };
                }
                resolve(r);
            }, 3000);
        }));
    };
    UserService.prototype.register = function (user) {
        var _this = this;
        var u = Models.User.getUserByRegisterModel(user);
        return Observable_1.Observable.fromPromise(new Promise(function (resolve) {
            setTimeout(function () {
                var r = { result: true };
                console.log("register user");
                _this._registered.set(u.email, u);
                resolve(r);
            }, 3000);
        }));
    };
    UserService.prototype.loadUserInfo = function () {
        return user_mock_1.UserMock.Create();
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UserService);
    return UserService;
})();
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map