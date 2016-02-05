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
var browser_1 = require('angular2/platform/browser');
var menu_1 = require('./components/menu');
var locator_service_1 = require('./services/locator.service');
var CtocApp = (function () {
    function CtocApp(_srvLocator) {
        var _this = this;
        this._srvLocator = _srvLocator;
        this.projectName = "C2C";
        this.toggleNav = false;
        window.addEventListener('resize', function () { _this.docWidth = window.innerWidth; });
    }
    CtocApp.prototype.ngOnInit = function () {
        this.screenLoadingOff();
    };
    Object.defineProperty(CtocApp.prototype, "currentUser", {
        get: function () {
            return this.userInfoService.getUserInfo();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtocApp.prototype, "userInfoService", {
        /** Сервис для получения информации о текущем пользователе */
        get: function () {
            return this._srvLocator.getService('IUserInfoService');
        },
        enumerable: true,
        configurable: true
    });
    /** отключение экрана загрузки */
    CtocApp.prototype.screenLoadingOff = function () {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementsByTagName('html')[0].classList.remove('startBody');
        document.body.classList.remove('startBody');
    };
    Object.defineProperty(CtocApp.prototype, "navClass", {
        // панель навигации    
        get: function () {
            return this.toggleNav ? '' : 'navbar-collapse collapse';
        },
        enumerable: true,
        configurable: true
    });
    CtocApp.prototype.navToggle = function () {
        this.toggleNav = !this.toggleNav;
    };
    Object.defineProperty(CtocApp.prototype, "docWidth", {
        get: function () {
            return this._docWidth;
        },
        set: function (val) {
            this._docWidth = val;
            this.toggleNav = false;
        },
        enumerable: true,
        configurable: true
    });
    CtocApp = __decorate([
        core_1.Component({
            selector: 'ctoc-app',
            templateUrl: 'app/view/ctoc.html',
            directives: [menu_1.C2cMenu],
            providers: [locator_service_1.ServiceLocator]
        }), 
        __metadata('design:paramtypes', [locator_service_1.ServiceLocator])
    ], CtocApp);
    return CtocApp;
})();
browser_1.bootstrap(CtocApp);
//# sourceMappingURL=app.boot.js.map