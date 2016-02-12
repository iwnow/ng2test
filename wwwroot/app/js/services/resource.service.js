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
var Observable_1 = require('rxjs/Observable');
var http_1 = require('angular2/http');
var all_1 = require('../contracts/all');
var event_service_1 = require('./event.service');
var all_2 = require('../utils/all');
var ResourceService = (function () {
    function ResourceService(_http, _events) {
        this._http = _http;
        this._events = _events;
        this._culture = all_1.Cultures.ru;
        this._urlResx = 'app/resources/';
        this._srvName = 'ResourceService';
        this._eventService = _events;
        this._cacheJson = new Map();
    }
    ResourceService.prototype.supportedCultures = function () {
        return [all_1.Cultures.ru, all_1.Cultures.en];
    };
    ResourceService.prototype.getResource = function () {
        return this.getResourceByCulture(this._culture);
    };
    ResourceService.prototype.getResourceByCulture = function (culture) {
        if (this._cacheJson.has(this._culture))
            return Observable_1.Observable.fromPromise(Promise.resolve(this._cacheJson.get(this._culture)));
        return this.resxFromServer(this._culture);
    };
    ResourceService.prototype.setResource = function (culture) {
        this._culture = culture;
    };
    ResourceService.prototype.getNameByEnum = function (culture) {
        var res = '';
        switch (culture) {
            case all_1.Cultures.en:
                res = 'En';
                break;
            case all_1.Cultures.ru:
                res = 'Ru';
                break;
            default:
                break;
        }
        return res;
    };
    ResourceService.prototype.getCultureByName = function (name) {
        switch (name.toLowerCase()) {
            case 'ru':
                return all_1.Cultures.ru;
                break;
            case 'en':
                return all_1.Cultures.en;
            default:
                break;
        }
    };
    ResourceService.prototype.resxFromServer = function (culture) {
        var _this = this;
        var resxName = this.getNameByEnum(culture).toLowerCase();
        console.log("get resource from server: " + culture);
        return this._http
            .get("" + this._urlResx + resxName + ".json")
            .map(function (res) {
            var o = res.json();
            _this._cacheJson.set(culture, o);
            return o;
        })
            .catch(function (e, s, c) {
            //emit in event bus with global exception key
            _this._events.emit({
                key: all_2.Descriptors.Exceptions,
                data: e.text()
            });
            //return null in observable over promise (should find methond in Observable like Promise.resolve())
            return Observable_1.Observable.fromPromise(Promise.resolve(null));
        });
    };
    ResourceService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, event_service_1.EventService])
    ], ResourceService);
    return ResourceService;
})();
exports.ResourceService = ResourceService;
//# sourceMappingURL=resource.service.js.map