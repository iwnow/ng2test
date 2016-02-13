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
var C2cLogin = (function () {
    function C2cLogin(_locator) {
        this._locator = _locator;
        this._isSending = false;
        this._model = new all_3.ViewLoginModel();
        //set event on resize
        this.registerResizeListening();
        //set event on lang changed
        this.registerLangChanged();
    }
    Object.defineProperty(C2cLogin.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    C2cLogin.prototype.registerResizeListening = function () {
        var t = document.getElementById('loginTable');
        t.style.height = (window.innerHeight - 70).toString() + 'px';
        this._winResizeSubscription = this.eventService.subscribe(all_2.Descriptors.WinResize, function (data) {
            t.style.height = data.height > 400 ? (data.height - data.height / 3).toFixed(0).toString() + 'px' : '400px';
        });
    };
    C2cLogin.prototype.registerLangChanged = function () {
        var _this = this;
        this._langChangeSubscription = this.eventService.subscribe(all_2.Descriptors.LanguageChange, function (data) {
            _this.updateResource(data);
        });
    };
    C2cLogin.prototype.updateCultureUI = function (resx) {
        if (!resx) {
            this.eventService.emit({ key: all_2.Descriptors.Exceptions, data: '[login.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!' });
            return;
        }
        this._resx = resx;
        this.btnSendTxt = resx.btnSend;
        this.loginFormCaption = resx.captionForm;
        this.emailLabelText = resx.emailLabelText;
        this.passLabelText = resx.passLabelText;
    };
    C2cLogin.prototype.updateResource = function (culture) {
        var _this = this;
        this._locator.getService('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(function (data) {
            _this.updateCultureUI(data.loginPage);
        });
    };
    C2cLogin.prototype.ngOnInit = function () {
        var _this = this;
        this.showSpinner(false);
        this._locator.getService('IResourceService')
            .getResource()
            .subscribe(function (data) {
            _this.updateCultureUI(data.loginPage);
        });
    };
    C2cLogin.prototype.ngOnDestroy = function () {
        this._langChangeSubscription.unsubscribe();
        this._winResizeSubscription.unsubscribe();
    };
    Object.defineProperty(C2cLogin.prototype, "userService", {
        get: function () {
            return this._locator.getService('IUserService');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cLogin.prototype, "eventService", {
        get: function () {
            return this._locator.getService('IEventService');
        },
        enumerable: true,
        configurable: true
    });
    C2cLogin.prototype.validateModel = function (model) {
        if (!model.email || !model.password)
            return false;
        if (!all_2.Validators.emailValidate(model.email)) {
            this._validationError = this._resx.errors.invalidEmail;
            return false;
        }
        this._validationError = '';
        return true;
    };
    C2cLogin.prototype.send = function () {
        var _this = this;
        if (!this.validateModel(this.model))
            return;
        var tmp = this.btnSendTxt;
        if (!this._isSending) {
            this._isSending = true;
            this.btnSendTxt = '';
            this.showSpinner();
            this.userService
                .logIn(this.model)
                .subscribe(function (res) {
                if (!res.result)
                    _this._validationError = res.reason;
                _this.showSpinner(false);
                _this.btnSendTxt = tmp;
                _this._isSending = false;
            });
        }
    };
    C2cLogin.prototype.showSpinner = function (show) {
        if (show === void 0) { show = true; }
        var spin = document.getElementById('spinBtnLogin');
        spin.innerHTML = !show ? '' : '<i class="fa fa fa-spinner fa-spin"></i>';
    };
    C2cLogin = __decorate([
        core_1.Component({
            selector: 'ctoc-login',
            templateUrl: 'app/view/ctoc-login.html'
        }), 
        __metadata('design:paramtypes', [all_1.ServiceLocator])
    ], C2cLogin);
    return C2cLogin;
})();
exports.C2cLogin = C2cLogin;
//# sourceMappingURL=login.js.map