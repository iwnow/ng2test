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
var C2cContacts = (function () {
    function C2cContacts(_locator) {
        this._locator = _locator;
    }
    C2cContacts.prototype.ngOnInit = function () {
        var _this = this;
        this.registerLangChanged();
        this._locator.getService('IResourceService')
            .getResource()
            .subscribe(function (data) {
            _this.updateCultureUI(data.controlPanel.contactsPan);
        });
        this._schemeColumns = this.getSchemeColumns();
        this._contacts = this.getContacts();
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
        this.updateGridResxByRef(this._schemeColumns);
    };
    C2cContacts.prototype.updateResource = function (culture) {
        var _this = this;
        this._locator.getService('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(function (data) {
            _this.updateCultureUI(data.controlPanel.contactsPan);
        });
    };
    C2cContacts.prototype.getContacts = function () {
        return all_3.ContactMock.getContacts(7);
    };
    C2cContacts.prototype.selectContact = function (el) {
        this.selectedElement = el;
    };
    C2cContacts.prototype.updateGridResxByRef = function (sc) {
        var _this = this;
        sc.scheme.forEach(function (i) {
            i.column.name = _this._resx.table[i.column.id];
        });
    };
    C2cContacts.prototype.removeContact = function () {
        var _this = this;
        if (!this.selectedElement)
            return;
        var tmp = this._contacts;
        var ind = tmp.findIndex(function (i) { return i.id == _this.selectedElement.id; });
        this._contacts.splice(ind, 1);
    };
    C2cContacts.prototype.getSchemeColumns = function () {
        return new grid.C2cGridColumnsScheme([{
                order: 0,
                column: new grid.C2cGridColumn('avatar', '', grid.C2cGridColumnType.pic)
            }, {
                order: 1,
                column: new grid.C2cGridColumn('familyName', '')
            }, {
                order: 2,
                column: new grid.C2cGridColumn('givenName', '')
            }, {
                order: 3,
                column: new grid.C2cGridColumn('middleName', '')
            }, {
                order: 4,
                column: new grid.C2cGridColumn('mail', '')
            }, {
                order: 5,
                column: new grid.C2cGridColumn('mobilePhone', '')
            }, {
                order: 6,
                column: new grid.C2cGridColumn('workPhone', '')
            }, {
                order: 7,
                column: new grid.C2cGridColumn('internalPhone', '')
            }, {
                order: 8,
                column: new grid.C2cGridColumn('position', '')
            }, {
                order: 9,
                column: new grid.C2cGridColumn('subdivision', '')
            }
        ]);
    };
    C2cContacts = __decorate([
        core_1.Component({
            selector: 'ctoc-contacts',
            template: "\n        <div class=\"grid-menu\">\n            <div class=\"btn-group\">\n                <button [title]=\"_resx ? _resx.tableMenu.save : ''\" type=\"button\" class=\"btn btn-default\">\n                    <span class=\"glyphicon glyphicon-floppy-save\"></span>\n                </button>\n                <button [title]=\"_resx ? _resx.tableMenu.add : ''\" type=\"button\" class=\"btn btn-default\">\n                    <span class=\"glyphicon glyphicon-plus\"></span>\n                </button>\n                <button [title]=\"_resx ? _resx.tableMenu.edit : ''\" type=\"button\" class=\"btn btn-default\">\n                    <span class=\"glyphicon glyphicon-edit\"></span>\n                </button>\n                <button [title]=\"_resx ? _resx.tableMenu.delete : ''\" type=\"button\" class=\"btn btn-default\"\n                    (click)=\"removeContact()\">\n                    <span class=\"glyphicon glyphicon-remove\"></span>\n                </button>\n                <button [title]=\"_resx ? _resx.tableMenu.xls : ''\" type=\"button\" class=\"btn btn-default\">\n                    <span class=\"glyphicon glyphicon-folder-open\"></span>\n                </button>\n            </div>\n        </div>\n        <ctoc-grid \n            (selectedElement)=\"selectContact($event)\"\n            [gridColScheme]=\"_schemeColumns\"\n            [data]=\"_contacts\"\n            >\n        </ctoc-grid>   \n    ",
            directives: [grid.C2cGrid],
            styles: ["\n        .grid-menu {\n            margin-bottom: 15px;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [all_1.ServiceLocator])
    ], C2cContacts);
    return C2cContacts;
})();
exports.C2cContacts = C2cContacts;
//# sourceMappingURL=contacts.js.map