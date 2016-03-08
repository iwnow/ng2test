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
var Utils = require('../utils/all');
var Services = require('../services/all');
var profile_1 = require('./profile');
var editpass_1 = require('./editpass');
var contacts_1 = require('./contacts');
var C2cContent = (function () {
    function C2cContent(_locator) {
        this._locator = _locator;
        this.dataChanged = new core_1.EventEmitter();
        this._childWinDataChanged = false;
    }
    C2cContent.prototype.ngOnInit = function () { };
    C2cContent.prototype.childWindowDataChanged = function (changed) {
        this._childWinDataChanged = changed;
        this.dataChanged.emit(changed);
    };
    Object.defineProperty(C2cContent.prototype, "user", {
        get: function () {
            return this.userService.getUserInfo();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cContent.prototype, "company", {
        get: function () {
            return this.user.companies.length > 0 ? this.user.companies[0].name : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cContent.prototype, "userService", {
        get: function () {
            return this._locator.getService('IUserService');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cContent.prototype, "menuId", {
        get: function () {
            return this.sidebarSelectedMenuItem ? this.sidebarSelectedMenuItem.Id : '';
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], C2cContent.prototype, "dataChanged", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Utils.MenuItem)
    ], C2cContent.prototype, "sidebarSelectedMenuItem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], C2cContent.prototype, "contentHeader", void 0);
    C2cContent = __decorate([
        core_1.Component({
            selector: 'ctoc-content',
            inputs: ['contentHeader', 'sidebarSelectedMenuItem'],
            directives: [profile_1.C2cProfile, editpass_1.C2cEditPass, contacts_1.C2cContacts],
            template: "\n        <div class=\"col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main\">\n            <h3 class=\"page-header\">{{company}}&nbsp;/&nbsp;{{contentHeader}}</h3>\n            <ctoc-profile *ngIf=\"menuId == 'profile'\"></ctoc-profile>\n            <ctoc-edit-pass *ngIf=\"menuId == 'password'\"></ctoc-edit-pass>\n            <ctoc-contacts  *ngIf=\"menuId == 'contacts'\"\n                (dataChanged)=\"childWindowDataChanged($event)\"\n            ></ctoc-contacts>\n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [Services.ServiceLocator])
    ], C2cContent);
    return C2cContent;
})();
exports.C2cContent = C2cContent;
//# sourceMappingURL=content.js.map