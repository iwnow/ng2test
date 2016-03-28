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
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
require('rxjs/Rx');
var all_1 = require('./components/all');
var all_2 = require('./services/all');
var Menu = require('./utils/menu');
var Utils = require('./utils/all');
core_1.enableProdMode();
var CtocApp = (function () {
    function CtocApp(_eventService, _usrService, _srvLocator, _exceptionService, _loggerService) {
        this._eventService = _eventService;
        this._usrService = _usrService;
        this._srvLocator = _srvLocator;
        this._exceptionService = _exceptionService;
        this._loggerService = _loggerService;
        this.loginOrReg = true;
        //fix with resources
        this.profileMenu = new Menu.SidebarMenu([
            new Menu.MenuItem('profile', ''),
            new Menu.MenuItem('password', '')
        ]);
        this.controlMenu = new Menu.SidebarMenu([
            new Menu.MenuItem('contacts', ''),
            new Menu.MenuItem('pay', '')
        ]);
        this.loginMenu = { dropped: false };
        this.langMenu = { dropped: false };
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
        this.loginLink = resx.navBar.login;
        this.registerLink = resx.navBar.register;
        this.ddMenuCntrlPan = resx.navBar.dropDownNavMenu.controlPanel;
        this.ddMenuProfilePan = resx.navBar.dropDownNavMenu.profilePanel;
        this.ddMenuLogOutBtn = resx.navBar.dropDownNavMenu.logOutBtn;
        //menu item in sidebar
        this.profileMenu.Items[this.profileMenu.Items.findIndex(function (i) { return i.Id == 'profile'; })].TextItem = resx.profilePanel.sideBarMenu.profile;
        this.profileMenu.Items[this.profileMenu.Items.findIndex(function (i) { return i.Id == 'password'; })].TextItem = resx.profilePanel.sideBarMenu.passwordManage;
        this.controlMenu.Items[this.controlMenu.Items.findIndex(function (i) { return i.Id == 'contacts'; })].TextItem = resx.controlPanel.sideBarMenu.contacts;
        this.controlMenu.Items[this.controlMenu.Items.findIndex(function (i) { return i.Id == 'pay'; })].TextItem = resx.controlPanel.sideBarMenu.payment;
    };
    CtocApp.prototype.updateResource = function (culture) {
        var _this = this;
        this._srvLocator.getService('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(function (data) {
            _this.updateCultureUI(data);
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
        //timeout - mousedown rise before var in template changed
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
        this.loginMenu.dropped = false;
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
        this.langMenu.dropped = false;
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
            directives: [all_1.C2cWorkspace, all_1.C2cLogin, all_1.C2cRegister],
            providers: [all_2.EventService, all_2.ExceptionService, all_2.LoggerService, all_2.ResourceService, all_2.ServiceLocator, all_2.UserService,
                http_1.HTTP_PROVIDERS],
            template: "\n    <nav  class=\"navbar navbar-inverse navbar-fixed-top\">\n    <div class=\"container-fluid\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle\" (click)=\"navToggle()\">\n                <span class=\"sr-only\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n                <span class=\"icon-bar\"></span>\n            </button>\n            <a class=\"navbar-brand\" href=\"#\">{{projectName}}</a>\n        </div>\n            \n        <div [ngClass]=\"navClass\"> \n        <ul class=\"nav navbar-nav navbar-right\">\n            <li>                \n                <a href=\"#\"\n                    (click)=\"langMenu.dropped = !langMenu.dropped;\"\n                    (blur)=\"langMenu.dropped = false;\">\n                    {{selectedLang}}\n                    <span class=\"caret\"></span>\n                </a>\n                <div [ngClass]=\"langMenu.dropped ? 'dropdown open' : 'dropdown'\">\n                    <ul class=\"dropdown-menu\" style=\"min-width:20px;\">\n                        <li *ngFor=\"#lang of languages\"><a href=\"#\" (mousedown)=\"langChoose(lang)\">{{lang}}</a></li>\n                    </ul>\n                </div>\n            </li>\n        </ul>\n        <ul *ngIf = \"!currentUser\" class=\"nav navbar-nav navbar-right\">\n            <li><a href=\"#\" (click)=\"loginOrReg = true\">{{loginLink}}</a></li>\n            <li><a href=\"#\" (click)=\"loginOrReg = false\">{{registerLink}}</a></li>\n        </ul>\n        <ul *ngIf = \"currentUser\" class=\"nav navbar-nav navbar-right\">\n            <li>                               \n                <a href=\"#\"\n                    (click)=\"loginMenu.dropped = !loginMenu.dropped;\"\n                    (blur)=\"loginMenu.dropped = false;\">\n                    <span class=\"glyphicon glyphicon-user\"></span>\n                    {{currentUser.email }}\n                    <span class=\"caret\"></span>\n                </a>\n                <div [ngClass]=\"loginMenu.dropped ? 'dropdown open' : 'dropdown'\">\n                    <ul class=\"dropdown-menu\">\n                        <li><a href=\"#\" (mousedown)=\"selectWorkspace('controlPan')\"><span class=\"glyphicon glyphicon-list-alt\"></span>&nbsp;&nbsp;{{ddMenuCntrlPan}}</a></li>\n                        <li><a href=\"#\" (mousedown)=\"selectWorkspace('profilePan')\"><span class=\"glyphicon glyphicon-user\"></span>&nbsp;&nbsp;{{ddMenuProfilePan}}</a></li>\n                        <!--<li class=\"divider\"></li>-->\n                        <li><a href=\"#\" (mousedown)=\"logOut()\"><span class=\"glyphicon glyphicon-log-out\"></span>&nbsp;&nbsp;{{ddMenuLogOutBtn}}</a></li>\n                    </ul>\n                </div>\n            </li>\n        </ul>        \n        <!--<form class=\"navbar-form navbar-right\">\n            <input type=\"text\" class=\"form-control\" placeholder=\"Search...\">\n        </form>-->          \n        </div>\n    </div>\n</nav>\n\n<div class=\"container-fluid\">\n    <ctoc-workspace *ngIf = \"currentUser\"\n        [workspacePanName]=\"selectedWorkspace\"\n        [workspaceMenu]=\"selectedWorkspaceMenu\"></ctoc-workspace>\n    <ctoc-login *ngIf = \"!currentUser && loginOrReg\"></ctoc-login>\n    <ctoc-register *ngIf = \"!currentUser && !loginOrReg\"></ctoc-register>\n</div>\n<!--<div class='notifications'>Notification message some important data for you, don't ignore this please! </div>-->\n    "
        }), 
        __metadata('design:paramtypes', [all_2.EventService, all_2.UserService, all_2.ServiceLocator, all_2.ExceptionService, all_2.LoggerService])
    ], CtocApp);
    return CtocApp;
}());
browser_1.bootstrap(CtocApp).catch(function (err) {
    CtocApp.IsExceptionRised = true;
    document.getElementById('startScreen').style.display = 'table';
    document.body.removeChild(document.getElementsByTagName('ctoc-app')[0]);
    document.getElementById('startScreen').childNodes[0].textContent = err;
});
