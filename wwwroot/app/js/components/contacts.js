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
var all_1 = require('../services/all');
var all_2 = require('../utils/all');
var all_3 = require('../mocks/all');
var grid = require('./grid');
var contact_edit_1 = require('./contact-edit');
var __DEBUG__ = true;
var C2cContacts = (function () {
    function C2cContacts(_locator) {
        this._locator = _locator;
        this.dataChanged = new core_1.EventEmitter();
        this._rowPerPage = 10;
        this._viewIsEditing = false;
        this._addOrEdit = false;
    }
    C2cContacts.prototype.ngOnInit = function () {
        var _this = this;
        this.registerLangChanged();
        this._locator.getService('IResourceService')
            .getResource()
            .subscribe(function (data) {
            _this.updateCultureUI(data.controlPanel.contactsPan);
        });
        this._gridSchema = this.getSchemeColumns();
        this._contacts = this.getContacts();
        this._dataGrid = this.toDataGrid(this._contacts);
    };
    C2cContacts.prototype.ngOnDestroy = function () {
        this._langChangeSubscription.unsubscribe();
    };
    Object.defineProperty(C2cContacts.prototype, "userService", {
        get: function () {
            return this._locator.getService('IUserService');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cContacts.prototype, "eventService", {
        get: function () {
            return this._locator.getService('IEventService');
        },
        enumerable: true,
        configurable: true
    });
    C2cContacts.prototype.registerLangChanged = function () {
        var _this = this;
        this._langChangeSubscription = this.eventService.subscribe(all_2.Descriptors.LanguageChange, function (data) {
            _this.updateResource(data);
        });
    };
    C2cContacts.prototype.updateCultureUI = function (resx) {
        if (!resx) {
            this.eventService.emit({ key: all_2.Descriptors.Exceptions, data: '[contact.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!' });
            return;
        }
        this._resx = resx;
        this._gridSchema = this.updateGridResxByRef(this._gridSchema);
    };
    C2cContacts.prototype.updateResource = function (culture) {
        var _this = this;
        this._locator.getService('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(function (data) {
            _this.updateCultureUI(data.controlPanel.contactsPan);
        });
    };
    C2cContacts.prototype.updateGridResxByRef = function (sc) {
        var _this = this;
        if (!sc)
            return;
        var buf = sc.getSchema();
        buf.forEach(function (i) {
            i.name = _this._resx.table[i.id] || i.name;
        });
        var nb = new grid.C2cGridSchema();
        nb.addRange(buf);
        return nb;
    };
    C2cContacts.prototype.getContacts = function () {
        return all_3.ContactMock.getContacts(13);
    };
    C2cContacts.prototype.gridRowDblClick = function (row) {
        this.showEditPanel(false, row.getTag());
    };
    C2cContacts.prototype.gridRowSelected = function (row) {
        this._currentSelectedRow = row;
    };
    C2cContacts.prototype.editContact = function () {
        if (!this._currentSelectedRow)
            return;
        this.showEditPanel(false, this._currentSelectedRow.getTag());
    };
    C2cContacts.prototype.fromEdit = function (c) {
        if (this._addOrEdit) {
            this._contacts.push(c);
        }
        else {
            var ind = this._contacts.findIndex(function (i) { return i.id == c.id; });
            this._contacts[ind] = c;
        }
        this._dataGrid = this.toDataGrid(this._contacts);
        this.dataChanged.emit(true);
        this.hideEditPanel();
    };
    C2cContacts.prototype.cancelEdit = function () {
        this.hideEditPanel();
    };
    C2cContacts.prototype.addContact = function () {
        this.showEditPanel(true);
    };
    C2cContacts.prototype.showEditPanel = function (addOrEdit, model) {
        if (model === void 0) { model = null; }
        this._addOrEdit = addOrEdit;
        this._viewIsEditing = true;
        this._modelToEdit = model;
    };
    C2cContacts.prototype.hideEditPanel = function () {
        this._viewIsEditing = false;
    };
    C2cContacts.prototype.saveContacts = function () {
        this.dataChanged.emit(false);
    };
    C2cContacts.prototype.getSchemeColumns = function () {
        var s = new grid.C2cGridSchema();
        var ava = new grid.C2cGridColumn('avatar', 'avatar', 0, grid.C2cGridColumnType.pic);
        ava.width = 50;
        s.addRange([
            new grid.C2cGridColumn('givenName', 'givenName', 1),
            new grid.C2cGridColumn('familyName', 'familyName', 2),
            new grid.C2cGridColumn('middleName', 'middleName', 3),
            new grid.C2cGridColumn('mail', 'mail', 4),
            new grid.C2cGridColumn('position', 'position', 5),
            new grid.C2cGridColumn('subdivision', 'subdivision', 6),
            new grid.C2cGridColumn('mobilePhone', 'mobilePhone', 7),
            new grid.C2cGridColumn('workPhone', 'workPhone', 8),
            new grid.C2cGridColumn('internalPhone', 'internalPhone', 9),
            ava
        ]).addCounter();
        return s;
    };
    C2cContacts.prototype.toDataGrid = function (cs) {
        var cols = this._gridSchema.getSchema();
        return cs.map(function (c) {
            return new grid.C2cGridRow([
                new grid.C2cGridDataCell(cols.find(function (i) { return i.id == 'givenName'; }), c.givenName),
                new grid.C2cGridDataCell(cols.find(function (i) { return i.id == 'familyName'; }), c.familyName),
                new grid.C2cGridDataCell(cols.find(function (i) { return i.id == 'middleName'; }), c.middleName),
                new grid.C2cGridDataCell(cols.find(function (i) { return i.id == 'mail'; }), c.mail),
                new grid.C2cGridDataCell(cols.find(function (i) { return i.id == 'position'; }), c.position),
                new grid.C2cGridDataCell(cols.find(function (i) { return i.id == 'subdivision'; }), c.subdivision),
                new grid.C2cGridDataCell(cols.find(function (i) { return i.id == 'mobilePhone'; }), c.mobilePhone),
                new grid.C2cGridDataCell(cols.find(function (i) { return i.id == 'workPhone'; }), c.workPhone),
                new grid.C2cGridDataCell(cols.find(function (i) { return i.id == 'internalPhone'; }), c.internalPhone),
                new grid.C2cGridDataCell(cols.find(function (i) { return i.id == 'avatar'; }), c.avatar)
            ]).setTag(c);
        });
    };
    C2cContacts.prototype.log = function (m) {
        if (__DEBUG__) {
            console.log(m);
        }
    };
    C2cContacts.prototype.removeContact = function () {
        if (!this._currentSelectedRow)
            return;
        var c = this._currentSelectedRow.getTag();
        this._contacts.splice(this._contacts.findIndex(function (i) { return i.id == c.id; }), 1);
        this._dataGrid = this.toDataGrid(this._contacts);
        this.dataChanged.emit(true);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], C2cContacts.prototype, "dataChanged", void 0);
    C2cContacts = __decorate([
        core_1.Component({
            selector: 'ctoc-contacts',
            template: "\n    <div *ngIf=\"!_viewIsEditing\" class=\"contacts-panel\">\n        <div class=\"grid-menu\">\n            <div class=\"btn-group\">\n                <button [title]=\"_resx ? _resx.tableMenu.save : ''\" type=\"button\" class=\"btn btn-default\"\n                    (click)=\"saveContacts()\"\n                    >\n                    <span class=\"glyphicon glyphicon-floppy-save\"></span>\n                </button>\n                <button [title]=\"_resx ? _resx.tableMenu.add : ''\" type=\"button\" class=\"btn btn-default\"\n                    (click)=\"addContact()\"\n                    >\n                    <span class=\"glyphicon glyphicon-plus\"></span>\n                </button>\n                <button [title]=\"_resx ? _resx.tableMenu.edit : ''\" type=\"button\" class=\"btn btn-default\"\n                    (click)=\"editContact()\"\n                    >\n                    <span class=\"glyphicon glyphicon-edit\"></span>\n                </button>\n                <button [title]=\"_resx ? _resx.tableMenu.delete : ''\" type=\"button\" class=\"btn btn-default\"\n                    (click)=\"removeContact()\">\n                    <span class=\"glyphicon glyphicon-remove\"></span>\n                </button>\n                <button [title]=\"_resx ? _resx.tableMenu.xls : ''\" type=\"button\" class=\"btn btn-default\">\n                    <span class=\"glyphicon glyphicon-folder-open\"></span>\n                </button>\n            </div>\n        </div>\n    \n        <div style=\"height:calc(100% - 49px)\">\n            <ctoc-grid\n                [schema]=\"_gridSchema\"\n                [data]=\"_dataGrid\"\n                [rowNumberPerPage]=\"_rowPerPage\"\n                (rowDblClick)=\"gridRowDblClick($event)\"\n                (rowSelected)=\"gridRowSelected($event)\"\n            >\n            </ctoc-grid>\n        </div>\n    </div>\n    <div *ngIf=\"_viewIsEditing\" class=\"contacts-panel\">\n        <ctoc-contact-edit \n            (ok)=\"fromEdit($event)\"\n            (cancel)=\"cancelEdit()\"\n            [addOrEdit]=\"_addOrEdit\"\n            [model]=\"_modelToEdit\"\n        ></ctoc-contact-edit>\n    </div>\n    \n    ",
            directives: [grid.C2cGrid, contact_edit_1.C2cContactEdit],
            styles: ["\n        .grid-menu {\n            margin-bottom: 15px;\n        }\n        .contacts-panel {\n            height: calc(100% - 60px);\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [all_1.ServiceLocator])
    ], C2cContacts);
    return C2cContacts;
})();
exports.C2cContacts = C2cContacts;
//# sourceMappingURL=contacts.js.map