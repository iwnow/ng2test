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
var EventService = (function () {
    function EventService() {
        this.emitter = new core_1.EventEmitter(true);
    }
    EventService.prototype.emit = function (data) {
        this.emitter.emit(data);
    };
    EventService.prototype.subscribe = function (key, callback) {
        return this.emitter.subscribe(function (i) {
            var d = i;
            if (key != d.key)
                return;
            callback(d.data);
        });
    };
    EventService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], EventService);
    return EventService;
})();
exports.EventService = EventService;
//# sourceMappingURL=event.service.js.map