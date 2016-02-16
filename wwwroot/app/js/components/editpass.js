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
//test
var modal_1 = require('./modal');
var C2cEditPass = (function () {
    function C2cEditPass(_locator) {
        this._locator = _locator;
        this._model = new all_3.ViewChangePassword();
        this.modalShow = false;
        this.modalTitle = 'Информация';
        this.modalMsg = 'Пароль успешно изменен';
        this._isSending = false;
        //set event on resize
        //this.registerResizeListening();
        //set event on lang changed
        this.registerLangChanged();
    }
    Object.defineProperty(C2cEditPass.prototype, "model", {
        get: function () {
            return this._model;
        },
        enumerable: true,
        configurable: true
    });
    C2cEditPass.prototype.registerResizeListening = function () {
        // var t = document.getElementById('loginTable');
        // t.style.height = (window.innerHeight - 70).toString() + 'px';
        // this._winResizeSubscription = this.eventService.subscribe(Descriptors.WinResize, (data) => {
        //    t.style.height = data.height > 400 ? (data.height - data.height/3).toFixed(0).toString() + 'px' : '400px';
        // });
    };
    C2cEditPass.prototype.registerLangChanged = function () {
        var _this = this;
        this._langChangeSubscription = this.eventService.subscribe(all_2.Descriptors.LanguageChange, function (data) {
            _this.updateResource(data);
        });
    };
    C2cEditPass.prototype.updateCultureUI = function (resx) {
        if (!resx) {
            this.eventService.emit({ key: all_2.Descriptors.Exceptions, data: '[login.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!' });
            return;
        }
        this._resx = resx;
        this.oldPasswordLabel = resx.oldPasswordLabel;
        this.newPasswordLabel = resx.newPasswordLabel;
        this.confirmNewPasswordLabel = resx.confirmNewPasswordLabel;
        this.btnSendTxt = resx.btnSend;
    };
    C2cEditPass.prototype.updateResource = function (culture) {
        var _this = this;
        this._locator.getService('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(function (data) {
            _this.updateCultureUI(data.profilePanel.passwordContent);
        });
    };
    C2cEditPass.prototype.ngOnInit = function () {
        var _this = this;
        this.showSpinner(false);
        this._locator.getService('IResourceService')
            .getResource()
            .subscribe(function (data) {
            _this.updateCultureUI(data.profilePanel.passwordContent);
        });
    };
    C2cEditPass.prototype.ngOnDestroy = function () {
        this._langChangeSubscription.unsubscribe();
        //this._winResizeSubscription.unsubscribe();
    };
    Object.defineProperty(C2cEditPass.prototype, "userService", {
        get: function () {
            return this._locator.getService('IUserService');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cEditPass.prototype, "eventService", {
        get: function () {
            return this._locator.getService('IEventService');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cEditPass.prototype, "resxService", {
        get: function () {
            return this._locator.getService('IResourceService');
        },
        enumerable: true,
        configurable: true
    });
    C2cEditPass.prototype.validateModel = function (model) {
        return true;
    };
    C2cEditPass.prototype.send = function () {
        var _this = this;
        if (!this.validateModel(this.model))
            return;
        this.modalShow = true;
        var tmp = this.btnSendTxt;
        if (!this._isSending) {
            this._isSending = true;
            this.btnSendTxt = '';
            this.showSpinner();
            var sub = this.userService
                .changePassword(this._model)
                .subscribe(function (res) {
                _this.showSpinner(false);
                _this.btnSendTxt = tmp;
                _this._isSending = false;
                if (res.result)
                    console.log('pass changed');
                else
                    console.log("error handle: " + res.reason);
                sub.unsubscribe();
            });
        }
    };
    C2cEditPass.prototype.showSpinner = function (show) {
        if (show === void 0) { show = true; }
        var spin = document.getElementById('spinBtnPassChange');
        spin.innerHTML = !show ? '' : '<i class="fa fa fa-spinner fa-spin"></i>';
    };
    C2cEditPass = __decorate([
        core_1.Component({
            selector: 'ctoc-edit-pass',
            templateUrl: 'app/view/ctoc-edit-pass.html',
            directives: [modal_1.C2cModal]
        }), 
        __metadata('design:paramtypes', [all_1.ServiceLocator])
    ], C2cEditPass);
    return C2cEditPass;
})();
exports.C2cEditPass = C2cEditPass;
//# sourceMappingURL=editpass.js.map