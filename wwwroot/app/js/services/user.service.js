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
var event_service_1 = require('./event.service');
var Models = require('../models/all');
//mock objects for tests
var all_1 = require('../mocks/all');
var all_2 = require('../utils/all');
var UserService = (function () {
    function UserService(_eventsService) {
        this._eventsService = _eventsService;
        this._currentUser = null;
        this._registered = new Map();
        var u = all_1.UserMock.Create();
        this._registered.set(u.email, u);
        this._currentUser = u;
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
                    var userDb = _this._registered.get(u.email);
                    if (userDb.password == u.password) {
                        r = { result: true };
                        _this._currentUser = userDb;
                        console.dir(_this._currentUser);
                    }
                    else
                        r = { result: false, reason: 'login failed' };
                }
                resolve(r);
            }, 1000);
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
    UserService.prototype.changePassword = function (model) {
        var _this = this;
        return Observable_1.Observable.fromPromise(new Promise(function (resolve, reject) {
            throw 'test exception change password';
            var r = { result: true };
            resolve(r);
        }).catch(function (e) {
            _this._eventsService.emit({ key: all_2.Descriptors.Exceptions, data: e });
            var r = { result: false, reason: e };
            return r;
        }));
    };
    UserService.prototype.loadUserInfo = function () {
        return all_1.UserMock.Create();
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], UserService);
    return UserService;
})();
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map