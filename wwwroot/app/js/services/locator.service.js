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
/**
 * Сервис провайдер приложения
 */
var ServiceLocator = (function () {
    function ServiceLocator() {
        this._locator = new DefaultServiceLocator(new user_service_1.UserService(), new event_service_1.EventService());
    }
    ServiceLocator.prototype.getService = function (srvName) {
        return this._locator.getService(srvName);
    };
    ServiceLocator = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ServiceLocator);
    return ServiceLocator;
})();
exports.ServiceLocator = ServiceLocator;
var DefaultServiceLocator = (function () {
    function DefaultServiceLocator(_userService, _eventService) {
        this._userService = _userService;
        this._eventService = _eventService;
    }
    DefaultServiceLocator.prototype.getService = function (typeName) {
        if (!typeName)
            throw "Parameter [typeName] must not be empty!";
        switch (typeName) {
            case 'IUserService':
                return this._userService;
                break;
            case 'IEventService':
                return this._eventService;
                break;
            default:
                throw "class [" + typeName + "] is not implemented!";
        }
    };
    return DefaultServiceLocator;
})();
//# sourceMappingURL=locator.service.js.map