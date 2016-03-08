var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//--external modules
var core_1 = require('angular2/core');
//--app modules
var Menu = require('../utils/menu');
var C2cSidebar = (function () {
    function C2cSidebar() {
        this.selectedPage = new core_1.EventEmitter(true);
    }
    C2cSidebar.prototype.ngOnInit = function () {
        if (!this.menu.Items.find(function (i) { return i.IsActive == true; })) {
            this.choose(this.menu.Items[0].Id);
            return;
        }
        this.selectedPage.emit(this.menu.Items.find(function (i) { return i.IsActive == true; }));
    };
    C2cSidebar.prototype.choose = function (Id) {
        var _this = this;
        if (this.menu.outerDataChanged) {
            //modal dialo for save data before change menu item
            if (!confirm('Не сохраненные данные будут потеряны. Продолжить?'))
                return;
        }
        this.menu.Items.forEach(function (i) {
            if (i.Id == Id) {
                i.IsActive = true;
                _this.selectedPage.emit(i);
                return;
            }
            i.IsActive = false;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Menu.SidebarMenu)
    ], C2cSidebar.prototype, "menu", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], C2cSidebar.prototype, "selectedPage", void 0);
    C2cSidebar = __decorate([
        core_1.Component({
            selector: 'ctoc-sidebar',
            inputs: ['menu'],
            outputs: ['selectedPage'],
            template: "\n    <div class=\"col-sm-3 col-md-2 sidebar\">\n        <ul class=\"nav nav-sidebar\">\n            <li *ngFor=\"#mitem of menu.Items\" [ngClass]=\"mitem.IsActive ? 'active' : ''\">\n                <a href=\"#\" (mousedown)=\"choose(mitem.Id)\">{{mitem.TextItem}}</a>\n            </li>\n        </ul>         \n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], C2cSidebar);
    return C2cSidebar;
})();
exports.C2cSidebar = C2cSidebar;
//# sourceMappingURL=sidebar.js.map