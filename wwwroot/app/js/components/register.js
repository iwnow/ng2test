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
var C2cRegister = (function () {
    function C2cRegister(_locator) {
        this._locator = _locator;
        this._isSending = false;
        this._model = this.userService.getUserInfo();
        //set event on resize
        this.registerResizeListening();
        //set event on lang changed
        this.registerLangChanged();
    }
    C2cRegister.prototype.registerResizeListening = function () {
        var t = document.getElementById('registerTable');
        t.style.height = (window.innerHeight - 70).toString() + 'px';
        this.eventService.subscribe(all_2.Descriptors.WinResize, function (data) {
            t.style.height = data.height > 400 ? (data.height - data.height / 3).toFixed(0).toString() + 'px' : '400px';
        });
    };
    C2cRegister.prototype.registerLangChanged = function () {
        var _this = this;
        this.eventService.subscribe(all_2.Descriptors.LanguageChange, function (data) {
            _this.updateResource(data);
        });
    };
    C2cRegister.prototype.updateCultureUI = function (resx) {
        if (!resx) {
            this.eventService.emit({ key: all_2.Descriptors.Exceptions, data: '[register.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!' });
            return;
        }
        this.btnSendTxt = resx.btnSend;
        this.loginFormCaption = resx.captionForm;
        this.emailLabelText = resx.emailLabelText;
        this.passLabelText = resx.passLabelText;
        this.passConfirmLabelText = resx.passConfirmLabelText;
        this.companyNameLabelText = resx.companyNameLabelText;
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
        this.showSpinner(false);
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
    Object.defineProperty(C2cRegister.prototype, "model", {
        get: function () { return this._model; },
        set: function (val) {
            this._model = val;
        },
        enumerable: true,
        configurable: true
    });
    C2cRegister.prototype.send = function () {
        var _this = this;
        var tmp = this.btnSendTxt;
        if (!this._isSending) {
            this._isSending = true;
            this.btnSendTxt = '';
            this.showSpinner();
            setTimeout(function () {
                _this.showSpinner(false);
                _this.btnSendTxt = tmp;
                _this._isSending = false;
            }, 3000);
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
            templateUrl: 'app/view/ctoc-register.html'
        }), 
        __metadata('design:paramtypes', [all_1.ServiceLocator])
    ], C2cRegister);
    return C2cRegister;
})();
exports.C2cRegister = C2cRegister;
//# sourceMappingURL=register.js.map