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
var all_1 = require('../services/all');
var all_2 = require('../utils/all');
var C2cProfile = (function () {
    function C2cProfile(_locator) {
        this._locator = _locator;
        //set event on resize
        //this.registerResizeListening();
        //set event on lang changed
        this.registerLangChanged();
    }
    C2cProfile.prototype.registerResizeListening = function () {
        // var t = document.getElementById('loginTable');
        // t.style.height = (window.innerHeight - 70).toString() + 'px';
        // this._winResizeSubscription = this.eventService.subscribe(Descriptors.WinResize, (data) => {
        //    t.style.height = data.height > 400 ? (data.height - data.height/3).toFixed(0).toString() + 'px' : '400px';
        // });
    };
    C2cProfile.prototype.registerLangChanged = function () {
        var _this = this;
        this._langChangeSubscription = this.eventService.subscribe(all_2.Descriptors.LanguageChange, function (data) {
            _this.updateResource(data);
        });
    };
    C2cProfile.prototype.updateCultureUI = function (resx) {
        if (!resx) {
            this.eventService.emit({ key: all_2.Descriptors.Exceptions, data: '[login.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!' });
            return;
        }
        this._resx = resx;
        this._companyLabel = resx.profileContent.companyLabel;
        this._emailLabel = resx.profileContent.emailLabel;
        this._phoneNumberLabel = resx.profileContent.phoneNumberLabel;
        this._registerDateLabel = resx.profileContent.registerDateLabel;
    };
    C2cProfile.prototype.updateResource = function (culture) {
        var _this = this;
        this._locator.getService('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(function (data) {
            _this.updateCultureUI(data.profilePanel);
        });
    };
    C2cProfile.prototype.ngOnInit = function () {
        var _this = this;
        this._locator.getService('IResourceService')
            .getResource()
            .subscribe(function (data) {
            _this.updateCultureUI(data.profilePanel);
        });
    };
    C2cProfile.prototype.ngOnDestroy = function () {
        this._langChangeSubscription.unsubscribe();
        //this._winResizeSubscription.unsubscribe();
    };
    Object.defineProperty(C2cProfile.prototype, "userService", {
        get: function () {
            return this._locator.getService('IUserService');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cProfile.prototype, "eventService", {
        get: function () {
            return this._locator.getService('IEventService');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cProfile.prototype, "resxService", {
        get: function () {
            return this._locator.getService('IResourceService');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cProfile.prototype, "company", {
        get: function () {
            var cs = this.userService.getUserInfo().companies;
            return cs.length > 0 ? cs[0].name : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cProfile.prototype, "registerDate", {
        get: function () {
            var cs = this.userService.getUserInfo().companies;
            var locale = this.resxService.getCurrentCulture();
            return cs.length > 0 ? cs[0].registerDate.toLocaleDateString(locale) : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cProfile.prototype, "mobilePhone", {
        get: function () {
            return this.userService.getUserInfo().mobilePhone;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cProfile.prototype, "login", {
        get: function () {
            return this.userService.getUserInfo().email;
        },
        enumerable: true,
        configurable: true
    });
    C2cProfile = __decorate([
        core_1.Component({
            selector: 'ctoc-profile',
            templateUrl: 'app/view/ctoc-profile.html'
        }), 
        __metadata('design:paramtypes', [all_1.ServiceLocator])
    ], C2cProfile);
    return C2cProfile;
})();
exports.C2cProfile = C2cProfile;
//# sourceMappingURL=profile.js.map