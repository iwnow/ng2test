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
var locator_service_1 = require('../services/locator.service');
var sidebar_1 = require('./sidebar');
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
            inputs: ['workspacePanName', 'workspaceMenu'],
            directives: [sidebar_1.C2cSidebar]
        }), 
        __metadata('design:paramtypes', [locator_service_1.ServiceLocator])
    ], C2cWorkspace);
    return C2cWorkspace;
})();
exports.C2cWorkspace = C2cWorkspace;
//todo: fix with enum for select!
(function (WorkspacesName) {
    WorkspacesName[WorkspacesName["Profile"] = 0] = "Profile";
    WorkspacesName[WorkspacesName["ControlPanel"] = 1] = "ControlPanel";
})(exports.WorkspacesName || (exports.WorkspacesName = {}));
var WorkspacesName = exports.WorkspacesName;
//# sourceMappingURL=workspace.js.map