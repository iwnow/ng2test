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
var http_1 = require('angular2/http');
require('rxjs/Rx');
var all_1 = require('./components/all');
var all_2 = require('./services/all');
var Menu = require('./utils/menu');
var Utils = require('./utils/all');
var CtocApp = (function () {
    function CtocApp(_srvLocator, _exceptionService) {
        this._srvLocator = _srvLocator;
        this._exceptionService = _exceptionService;
        this.loginOrReg = true;
        //fix with resources
        this.profileMenu = new Menu.SidebarMenu([
            new Menu.MenuItem('profile', 'Profile'),
            new Menu.MenuItem('password', 'Change Password')
        ]);
        this.controlMenu = new Menu.SidebarMenu([
            new Menu.MenuItem('contacts', 'Contacts'),
            new Menu.MenuItem('pay', 'Payment Info')
        ]);
        this.projectName = "C2C";
        this.toggleNav = false;
        this.addResizeEvent();
        this.registerLangChanged();
        this.profileMenu.Items[0].IsActive = true;
        this.addLangs();
    }
    CtocApp.prototype.addResizeEvent = function () {
        var _this = this;
        window.addEventListener('resize', function () {
            _this.docWidth = window.innerWidth;
            _this.eventService.emit({
                key: Utils.Descriptors.WinResize,
                data: {
                    width: _this.docWidth,
                    height: window.innerHeight
                },
                who: 'resize app boot'
            });
        });
    };
    CtocApp.prototype.registerLangChanged = function () {
        var _this = this;
        this.eventService.subscribe(Utils.Descriptors.LanguageChange, function (data) {
            _this.updateResource(data);
        });
    };
    CtocApp.prototype.updateCultureUI = function (resx) {
        if (!resx) {
            this.eventService.emit({ key: Utils.Descriptors.Exceptions, data: '[app.boot.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!' });
            return;
        }
        this.loginLink = resx.login;
        this.registerLink = resx.register;
    };
    CtocApp.prototype.updateResource = function (culture) {
        var _this = this;
        this._srvLocator.getService('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(function (data) {
            _this.updateCultureUI(data.navBar);
        });
    };
    CtocApp.prototype.addLangs = function () {
        var _this = this;
        this.languages = this.resxService.supportedCultures().map(function (e) { return _this.resxService.getNameByEnum(e); });
        this.langChoose('Ru');
    };
    CtocApp.prototype.ngOnInit = function () {
        this.screenLoadingOff();
        this.selectWorkspace('controlPan');
    };
    Object.defineProperty(CtocApp.prototype, "currentUser", {
        get: function () {
            return this.userService.getUserInfo();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtocApp.prototype, "userService", {
        /** Сервис для получения информации о текущем пользователе */
        get: function () {
            return this._srvLocator.getService('IUserService');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtocApp.prototype, "resxService", {
        /** Сервис работы с ресурсами приложения */
        get: function () {
            return this._srvLocator.getService('IResourceService');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtocApp.prototype, "eventService", {
        /** Сервис асинхронных сообщений */
        get: function () {
            return this._srvLocator.getService('IEventService');
        },
        enumerable: true,
        configurable: true
    });
    CtocApp.prototype.logOut = function () {
        var _this = this;
        setTimeout(function () {
            _this.userService.logOut();
        }, 0);
    };
    /** отключение экрана загрузки */
    CtocApp.prototype.screenLoadingOff = function () {
        if (!CtocApp.IsExceptionRised) {
            document.getElementById('startScreen').style.display = 'none';
            document.getElementsByTagName('html')[0].classList.remove('startBody');
            document.body.classList.remove('startBody');
        }
    };
    Object.defineProperty(CtocApp.prototype, "navClass", {
        // UI панель навигации    
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
    //
    /**Выбор текущего воркспейса */
    CtocApp.prototype.selectWorkspace = function (wrkSpace) {
        //ev.preventDefault();
        this.selectedWorkspace = wrkSpace;
        switch (wrkSpace) {
            case 'controlPan':
                this.selectedWorkspaceMenu = this.controlMenu;
                break;
            case 'profilePan':
                this.selectedWorkspaceMenu = this.profileMenu;
                break;
            default:
                break;
        }
    };
    CtocApp.prototype.langChoose = function (lang) {
        if (this.selectedLang == lang)
            return;
        this.selectedLang = lang;
        var culture = this.resxService.getCultureByName(lang);
        this.resxService.setResource(culture);
        this.eventService.emit({
            key: Utils.Descriptors.LanguageChange,
            data: culture
        });
    };
    CtocApp.IsExceptionRised = false;
    CtocApp = __decorate([
        core_1.Component({
            selector: 'ctoc-app',
            templateUrl: 'app/view/ctoc.html',
            directives: [all_1.C2cWorkspace, all_1.C2cLogin, all_1.C2cRegister],
            providers: [all_2.ResourceService, all_2.ServiceLocator, all_2.EventService, all_2.UserService, all_2.ExceptionService,
                http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [all_2.ServiceLocator, all_2.ExceptionService])
    ], CtocApp);
    return CtocApp;
})();
browser_1.bootstrap(CtocApp).catch(function (err) {
    CtocApp.IsExceptionRised = true;
    document.getElementById('startScreen').style.display = 'table';
    document.body.removeChild(document.getElementsByTagName('ctoc-app')[0]);
    document.getElementById('startScreen').childNodes[0].textContent = err;
});
//# sourceMappingURL=app.boot.js.map