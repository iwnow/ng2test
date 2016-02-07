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
var locator_service_1 = require('../services/locator.service');
var C2cWorkspace = (function () {
    function C2cWorkspace(_srvLocator) {
        this._srvLocator = _srvLocator;
        this.currentUser = _srvLocator.getService('IUserService').getUserInfo();
    }
    C2cWorkspace.prototype.ngOnInit = function () { };
    C2cWorkspace = __decorate([
        core_1.Component({
            selector: 'ctoc-workspace',
            templateUrl: 'app/view/ctoc-workspace.html',
            inputs: ['workspacePanName']
        }), 
        __metadata('design:paramtypes', [locator_service_1.ServiceLocator])
    ], C2cWorkspace);
    return C2cWorkspace;
})();
exports.C2cWorkspace = C2cWorkspace;
//# sourceMappingURL=workspace.js.map