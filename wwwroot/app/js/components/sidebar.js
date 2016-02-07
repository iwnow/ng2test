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
var C2cSidebar = (function () {
    function C2cSidebar() {
    }
    C2cSidebar.prototype.ngOnInit = function () {
        this.menu.Items[0].IsActive = true;
    };
    C2cSidebar.prototype.choose = function (Id) {
        this.menu.Items.forEach(function (i) {
            if (i.Id == Id) {
                i.IsActive = true;
                return;
            }
            i.IsActive = false;
        });
    };
    C2cSidebar = __decorate([
        core_1.Component({
            selector: 'ctoc-sidebar',
            templateUrl: 'app/view/ctoc-sidebar.html',
            inputs: ['menu']
        }), 
        __metadata('design:paramtypes', [])
    ], C2cSidebar);
    return C2cSidebar;
})();
exports.C2cSidebar = C2cSidebar;
//# sourceMappingURL=sidebar.js.map