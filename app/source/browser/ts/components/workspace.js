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
//--external modules
var core_1 = require('angular2/core');
//--app modules
var locator_service_1 = require('../services/locator.service');
var sidebar_1 = require('./sidebar');
var content_1 = require('./content');
var C2cWorkspace = (function () {
    function C2cWorkspace(_srvLocator) {
        this._srvLocator = _srvLocator;
        this.dataChanged = new core_1.EventEmitter();
        this._childWinDataChanged = false;
        this.currentUser = _srvLocator.getService('IUserService').getUserInfo();
    }
    C2cWorkspace.prototype.childWindowDataChanged = function (changed) {
        this._childWinDataChanged = changed;
        this.dataChanged.emit(changed);
        this.workspaceMenu.outerDataChanged = changed;
    };
    C2cWorkspace.prototype.ngOnInit = function () {
        if (!this.sidebarSelectedMenuItem)
            this.selectMenuItem(this.workspaceMenu.Items[0]);
    };
    /**
     * Проверяет является ли страница активной в данный момент
     */
    C2cWorkspace.prototype.isActiveWorkspacePan = function (panName) {
        return this.workspacePanName == panName;
    };
    //from sidebar
    C2cWorkspace.prototype.selectMenuItem = function (selMenuItem) {
        if (this.sidebarSelectedMenuItem === selMenuItem)
            return;
        this.sidebarSelectedMenuItem = selMenuItem;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], C2cWorkspace.prototype, "dataChanged", void 0);
    C2cWorkspace = __decorate([
        core_1.Component({
            selector: 'ctoc-workspace',
            inputs: ['workspacePanName', 'workspaceMenu'],
            directives: [sidebar_1.C2cSidebar, content_1.C2cContent],
            template: "\n    <div *ngIf=\"isActiveWorkspacePan('controlPan')\" class=\"row\">\n        <ctoc-sidebar [menu]=\"workspaceMenu\" (selectedPage)=\"selectMenuItem($event)\"></ctoc-sidebar>\n        <ctoc-content\n            [sidebarSelectedMenuItem]=\"sidebarSelectedMenuItem\"\n            [contentHeader]=\"sidebarSelectedMenuItem.TextItem\"\n            (dataChanged)=\"childWindowDataChanged($event)\"\n            >\n        </ctoc-content>\n    </div>\n    <div *ngIf=\"isActiveWorkspacePan('profilePan')\" class=\"row\">\n            <ctoc-sidebar [menu]=\"workspaceMenu\" (selectedPage)=\"selectMenuItem($event)\"></ctoc-sidebar>\n            <ctoc-content \n                [sidebarSelectedMenuItem]=\"sidebarSelectedMenuItem\"\n                [contentHeader]=\"sidebarSelectedMenuItem.TextItem\">\n            </ctoc-content>\n    </div>\n    "
        }), 
        __metadata('design:paramtypes', [locator_service_1.ServiceLocator])
    ], C2cWorkspace);
    return C2cWorkspace;
}());
exports.C2cWorkspace = C2cWorkspace;
//todo: fix with enum for select!
(function (WorkspacesName) {
    WorkspacesName[WorkspacesName["Profile"] = 0] = "Profile";
    WorkspacesName[WorkspacesName["ControlPanel"] = 1] = "ControlPanel";
})(exports.WorkspacesName || (exports.WorkspacesName = {}));
var WorkspacesName = exports.WorkspacesName;
