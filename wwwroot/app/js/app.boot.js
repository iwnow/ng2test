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
var workspace_1 = require('./components/workspace');
var locator_service_1 = require('./services/locator.service');
var Menu = require('./utils/menu');
var CtocApp = (function () {
    function CtocApp(_srvLocator) {
        var _this = this;
        this._srvLocator = _srvLocator;
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
        window.addEventListener('resize', function () { _this.docWidth = window.innerWidth; });
        this.profileMenu.Items[0].IsActive = true;
    }
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
    //
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
    CtocApp = __decorate([
        core_1.Component({
            selector: 'ctoc-app',
            templateUrl: 'app/view/ctoc.html',
            directives: [workspace_1.C2cWorkspace],
            providers: [locator_service_1.ServiceLocator]
        }), 
        __metadata('design:paramtypes', [locator_service_1.ServiceLocator])
    ], CtocApp);
    return CtocApp;
})();
browser_1.bootstrap(CtocApp).catch(function (err) {
    document.body.removeChild(document.getElementsByTagName('ctoc-app')[0]);
    document.getElementById('startScreen').childNodes[0].textContent = ':( oops ' + err;
});
;
//# sourceMappingURL=app.boot.js.map