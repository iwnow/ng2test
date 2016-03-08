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
var all_1 = require('../models/all');
var all_2 = require('../services/all');
var all_3 = require('../utils/all');
var C2cContactEdit = (function () {
    function C2cContactEdit(_locator) {
        this._locator = _locator;
        /** create / edited return model */
        this.ok = new core_1.EventEmitter();
        /**cancel editing / creating */
        this.cancel = new core_1.EventEmitter();
    }
    Object.defineProperty(C2cContactEdit.prototype, "eventService", {
        get: function () {
            return this._locator.getService('IEventService');
        },
        enumerable: true,
        configurable: true
    });
    C2cContactEdit.prototype.registerLangChanged = function () {
        var _this = this;
        this._langChangeSubscription = this.eventService.subscribe(all_3.Descriptors.LanguageChange, function (data) {
            _this.updateResource(data);
        });
    };
    C2cContactEdit.prototype.updateCultureUI = function (resx) {
        if (!resx) {
            this.eventService.emit({ key: all_3.Descriptors.Exceptions, data: '[contact-edit.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!' });
            return;
        }
        this._resx = resx;
        this._header = this.addOrEdit ? this._resx.contactEdit.addTitle : this._resx.contactEdit.editTitle;
        this._cancelBtn = this._resx.contactEdit.cancel;
        this._saveBtn = this._resx.contactEdit.save;
        this._uploadPhoto = this._resx.contactEdit.uploadPhoto;
        this._givenName = this._resx.table.givenName;
        this._middleName = this._resx.table.middleName;
        this._familyName = this._resx.table.familyName;
        this._mail = this._resx.table.mail;
        this._position = this._resx.table.position;
        this._subdivision = this._resx.table.subdivision;
        this._mobilePhone = this._resx.table.mobilePhone;
        this._workPhone = this._resx.table.workPhone;
        this._internalPhone = this._resx.table.internalPhone;
    };
    C2cContactEdit.prototype.updateResource = function (culture) {
        var _this = this;
        this._locator.getService('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(function (data) {
            _this.updateCultureUI(data.controlPanel.contactsPan);
        });
    };
    C2cContactEdit.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.model)
            this.model = new all_1.Contact();
        this.registerLangChanged();
        this._locator.getService('IResourceService')
            .getResource()
            .subscribe(function (data) {
            _this.updateCultureUI(data.controlPanel.contactsPan);
        });
    };
    C2cContactEdit.prototype.ngOnDestroy = function () {
        this._langChangeSubscription.unsubscribe();
    };
    C2cContactEdit.prototype.saveClick = function () {
        this.ok.emit(this.model);
    };
    C2cContactEdit.prototype.cancelClick = function () {
        this.cancel.emit(null);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], C2cContactEdit.prototype, "addOrEdit", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', all_1.Contact)
    ], C2cContactEdit.prototype, "model", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], C2cContactEdit.prototype, "ok", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], C2cContactEdit.prototype, "cancel", void 0);
    C2cContactEdit = __decorate([
        core_1.Component({
            selector: 'ctoc-contact-edit',
            template: "\n    <div style=\"height:100%\">\n    <h4 class=\"page-header\">{{_header}}</h4>\n        <div class=\"row\" style=\"height:calc(100% - 49px)\">\n            <!-- left column -->\n            <div class=\"col-md-4 col-sm-6 col-xs-12\">\n                <div class=\"text-center\">\n                    <img [style.height.px]=\"200\" [style.width.px]=\"200\"\n                        src=\"http://img3.goodfon.ru/original/1024x1024/1/a7/candice-neil-krasivaya-devushka.jpg\" \n                        class=\"avatar img-circle img-thumbnail\" alt=\"avatar\">\n                    <h6>{{_uploadPhoto}}</h6>\n                    <input type=\"file\" class=\"text-center center-block well well-sm\" style=\"width:100%\">\n                </div>\n            </div>\n            <!-- edit form column -->\n            <div class=\"col-md-8 col-sm-6 col-xs-12 personal-info\">\n            \n            <form class=\"form-horizontal\" role=\"form\">\n                <div class=\"form-group\">\n                    <label class=\"col-lg-3 control-label\">{{_givenName}}:</label>\n                    <div class=\"col-lg-8\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.givenName\" [placeholder]=\"_givenName\" type=\"text\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-lg-3 control-label\">{{_middleName}}:</label>\n                    <div class=\"col-lg-8\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.middleName\" [placeholder]=\"_middleName\" type=\"text\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-lg-3 control-label\">{{_familyName}}:</label>\n                    <div class=\"col-lg-8\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.familyName\" [placeholder]=\"_familyName\" value=\"\" type=\"text\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-lg-3 control-label\">{{_mail}}:</label>\n                    <div class=\"col-lg-8\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.mail\" [placeholder]=\"_mail\" type=\"text\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-md-3 control-label\">{{_position}}:</label>\n                    <div class=\"col-md-8\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.position\" [placeholder]=\"_position\" type=\"text\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-md-3 control-label\">{{_subdivision}}:</label>\n                    <div class=\"col-md-8\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.subdivision\" [placeholder]=\"_subdivision\" type=\"text\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-md-3 control-label\">{{_mobilePhone}}:</label>\n                    <div class=\"col-md-8\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.mobilePhone\" [placeholder]=\"_mobilePhone\" type=\"text\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-md-3 control-label\">{{_workPhone}}:</label>\n                    <div class=\"col-md-8\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.workPhone\" [placeholder]=\"_workPhone\" type=\"text\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-md-3 control-label\">{{_internalPhone}}:</label>\n                    <div class=\"col-md-8\">\n                        <input class=\"form-control\" [(ngModel)]=\"model.internalPhone\" [placeholder]=\"_internalPhone\" type=\"text\">\n                    </div>\n                </div>\n                \n                <div class=\"form-group\">\n                <label class=\"col-md-3 control-label\"></label>\n                <div class=\"col-md-8\">\n                    <input class=\"btn btn-primary\" [value]=\"_saveBtn\" type=\"button\" (click)=\"saveClick()\">\n                    <span></span>\n                    <input class=\"btn btn-default\" [value]=\"_cancelBtn\" type=\"button\" (click)=\"cancelClick()\">\n                </div>\n                </div>\n            </form>\n            </div>\n        </div>\n     </div>\n    "
        }), 
        __metadata('design:paramtypes', [all_2.ServiceLocator])
    ], C2cContactEdit);
    return C2cContactEdit;
})();
exports.C2cContactEdit = C2cContactEdit;
//# sourceMappingURL=contact-edit.js.map