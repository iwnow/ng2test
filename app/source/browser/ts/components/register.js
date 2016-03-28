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
var core_1 = require('angular2/core');
var all_1 = require('../services/all');
var all_2 = require('../utils/all');
var all_3 = require('../models/all');
var C2cRegister = (function () {
    function C2cRegister(_locator) {
        this._locator = _locator;
        this._registerSuccess = false;
        this._isModelValided = false;
        this._isSending = false;
        this._model = new all_3.ViewRegisterModel();
    }
    Object.defineProperty(C2cRegister.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    C2cRegister.prototype.ngOnDestroy = function () {
        this._langChangeSubscription.unsubscribe();
        this._winResizeSubscription.unsubscribe();
    };
    C2cRegister.prototype.ngAfterViewInit = function () {
        //set event on resize
        this.registerResizeListening();
        //set event on lang changed
        this.registerLangChanged();
        this.showSpinner(false);
    };
    C2cRegister.prototype.registerResizeListening = function () {
        var t = document.getElementById('registerTable');
        t.style.height = (window.innerHeight - 70).toString() + 'px';
        this._winResizeSubscription = this.eventService.subscribe(all_2.Descriptors.WinResize, function (data) {
            t.style.height = data.height > 400 ? (data.height - data.height / 3).toFixed(0).toString() + 'px' : '400px';
        });
    };
    C2cRegister.prototype.registerLangChanged = function () {
        var _this = this;
        this._langChangeSubscription = this.eventService.subscribe(all_2.Descriptors.LanguageChange, function (data) {
            _this.updateResource(data);
        });
    };
    C2cRegister.prototype.updateCultureUI = function (resx) {
        if (!resx) {
            this.eventService.emit({ key: all_2.Descriptors.Exceptions, data: '[register.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!' });
            return;
        }
        this._currentResx = resx;
        this.btnSendTxt = resx.btnSend;
        this.loginFormCaption = resx.captionForm;
        this.emailLabelText = resx.emailLabelText;
        this.passLabelText = resx.passLabelText;
        this.passConfirmLabelText = resx.passConfirmLabelText;
        this.companyNameLabelText = resx.companyNameLabelText;
        if (this._isModelValided)
            this.modelValid(this.model);
    };
    C2cRegister.prototype.updateResource = function (culture) {
        var _this = this;
        this._locator.getService('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(function (data) {
            _this.updateCultureUI(data.registerPage);
        });
    };
    C2cRegister.prototype.ngOnInit = function () {
        var _this = this;
        this._locator.getService('IResourceService')
            .getResource()
            .subscribe(function (data) {
            _this.updateCultureUI(data.registerPage);
        });
    };
    Object.defineProperty(C2cRegister.prototype, "userService", {
        get: function () {
            return this._locator.getService('IUserService');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cRegister.prototype, "eventService", {
        get: function () {
            return this._locator.getService('IEventService');
        },
        enumerable: true,
        configurable: true
    });
    C2cRegister.prototype.modelValid = function (m) {
        this._isModelValided = true;
        if (!m.email ||
            !m.companyName ||
            !m.password ||
            !m.confirmPassword)
            return false;
        if (!this.validateEmail(m.email)) {
            this._validationError = this._currentResx.errors.invalidEmail;
            return false;
        }
        else if (!this.validateCompany(m.companyName)) {
            this._validationError = this._currentResx.errors.companyIsAlreadyExist;
            return false;
        }
        else if (!this.validatePassword(m.password)) {
            this._validationError = this._currentResx.errors.passwordTooLess;
            return false;
        }
        else if (!this.validatePasswordSame(m.password, m.confirmPassword)) {
            this._validationError = this._currentResx.errors.confirmPasswordError;
            return false;
        }
        this._validationError = '';
        return true;
    };
    C2cRegister.prototype.validateEmail = function (email) {
        return all_2.Validators.emailValidate(email);
    };
    C2cRegister.prototype.validateCompany = function (companyName) {
        //todo: searchin server companies with same name
        return true;
    };
    C2cRegister.prototype.validatePassword = function (pass) {
        return all_2.Validators.passwordValidate(pass);
    };
    C2cRegister.prototype.validatePasswordSame = function (pass1, pass2) {
        return pass1 == pass2;
    };
    C2cRegister.prototype.send = function () {
        var _this = this;
        if (!this.modelValid(this.model))
            return;
        var tmp = this.btnSendTxt;
        var finishRegister = function () {
            _this.showSpinner(false);
            _this.btnSendTxt = tmp;
            _this._isSending = false;
        };
        if (!this._isSending) {
            this._isSending = true;
            this.btnSendTxt = '';
            this.showSpinner();
            this.userService
                .register(this.model)
                .subscribe(function (res) {
                finishRegister();
                if (!res.result)
                    _this._validationError = res.reason;
                else
                    _this._registerSuccess = true;
            }, function (err) {
                finishRegister();
                _this.eventService.emit({
                    key: all_2.Descriptors.Exceptions,
                    data: err
                });
            });
        }
    };
    C2cRegister.prototype.showSpinner = function (show) {
        if (show === void 0) { show = true; }
        var spin = document.getElementById('spinBtnRegister');
        spin.innerHTML = !show ? '' : '<i class="fa fa fa-spinner fa-spin"></i>';
    };
    C2cRegister = __decorate([
        core_1.Component({
            selector: 'ctoc-register',
            template: "\n  <table *ngIf=\"!_registerSuccess\" id=\"registerTable\" style=\"width: 100%;\">\n<tr>\n    <td style=\"width: auto;\"></td>\n    <td style=\"width: 350px;\">\n        <div class=\"panel panel-primary\">\n            <div class=\"panel-heading\">\n                <h3 class=\"panel-title text-center\">{{loginFormCaption}}</h3>\n            </div>\n            <div class=\"panel-body\">\n                <form>       \n                                 \n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-envelope\"></span></span>\n                        <input [(ngModel)]=\"_model.email\"\n                                type=\"email\" \n                                class=\"form-control\" \n                                [placeholder]=\"emailLabelText\" required>\n                    </div>       \n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-phone\"></span></span>\n                        <input [(ngModel)]=\"_model.companyName\" \n                                type=\"text\" class=\"form-control\" \n                                [placeholder]=\"companyNameLabelText\" required>\n                    </div>           \n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-lock\"></span></span>\n                        <input [(ngModel)]=\"_model.password\" \n                                type=\"password\" class=\"form-control\" \n                                [placeholder]=\"passLabelText\" required>\n                    </div>\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\"><span class=\"glyphicon glyphicon-lock\"></span></span>\n                        <input [(ngModel)]=\"_model.confirmPassword\" \n                                type=\"password\" class=\"form-control\" \n                                [placeholder]=\"passConfirmLabelText\" required>\n                    </div>                    \n                \n                    <button (click)=\"send()\" type=\"submit\"\n                            class=\"btn-success btn form-control\" \n                            style=\"width: 320px; max-width: 400px;\">\n                            <span id=\"spinBtnRegister\"><i class=\"fa fa fa-spinner fa-spin\"></i></span>\n                            {{btnSendTxt}}\n                    </button>\n                    \n                </form>\n            </div>\n        </div>\n        <div class=\"text-danger\" id=\"validate-text-error\">\n            {{_validationError}}\n        </div>\n    </td>\n    <td style=\"width: auto;\"></td>\n</tr>\n</table>\n<div *ngIf=\"_registerSuccess\">\n    check you email...\n</div>\n  "
        }), 
        __metadata('design:paramtypes', [all_1.ServiceLocator])
    ], C2cRegister);
    return C2cRegister;
}());
exports.C2cRegister = C2cRegister;
