var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var event_service_1 = require('./event.service');
var all_1 = require('../utils/all');
var ExceptionService = (function () {
    function ExceptionService(_events) {
        this._events = _events;
        this.register();
    }
    ExceptionService.prototype.register = function () {
        //console.log('ExceptionService registered');
        this._events.subscribe(all_1.Descriptors.Exceptions, function (data) {
            console.log((all_1.Descriptors.Exceptions + ":") + data);
        });
    };
    ExceptionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [event_service_1.EventService])
    ], ExceptionService);
    return ExceptionService;
})();
exports.ExceptionService = ExceptionService;
//# sourceMappingURL=exhandle.service.js.map