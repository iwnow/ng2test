"use strict";
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
var user_service_1 = require('./user.service');
var event_service_1 = require('./event.service');
var resource_service_1 = require('./resource.service');
/**
 * Сервис провайдер приложения
 */
var ServiceLocator = (function () {
    function ServiceLocator(_resx, _events, _users) {
        this._resx = _resx;
        this._events = _events;
        this._users = _users;
        this._locator = new DefaultServiceLocator(_users, _events, _resx);
    }
    ServiceLocator.prototype.getService = function (srvName) {
        return this._locator.getService(srvName);
    };
    ServiceLocator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [resource_service_1.ResourceService, event_service_1.EventService, user_service_1.UserService])
    ], ServiceLocator);
    return ServiceLocator;
}());
exports.ServiceLocator = ServiceLocator;
var DefaultServiceLocator = (function () {
    function DefaultServiceLocator(_userService, _eventService, _resxService) {
        this._userService = _userService;
        this._eventService = _eventService;
        this._resxService = _resxService;
    }
    DefaultServiceLocator.prototype.getService = function (typeName) {
        if (!typeName)
            throw "Parameter [typeName] must not be empty!";
        switch (typeName) {
            case 'IUserService':
                return this._userService;
            case 'IEventService':
                return this._eventService;
            case 'IResourceService':
                return this._resxService;
            default:
                throw "class [" + typeName + "] is not implemented!";
        }
    };
    return DefaultServiceLocator;
}());
