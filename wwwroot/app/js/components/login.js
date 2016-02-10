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
var C2cLogin = (function () {
    function C2cLogin(_locator) {
        this._locator = _locator;
        this.loginFormCaption = "Login Form";
        this.resourceName = "Send";
        this._isSending = false;
        this._model = this.userService.getUserInfo();
        this.eventService.subscribe('login', function (data) {
            console.log(data);
        });
        this.btnSendTxt = this.resourceName;
    }
    C2cLogin.prototype.ngOnInit = function () {
        var t = document.getElementById('loginTable');
        t.style.height = (window.innerHeight - 70).toString() + 'px';
        this.eventService.subscribe('resize', function (data) {
            t.style.height = data.height > 400 ? (data.height - data.height / 3).toFixed(0).toString() + 'px' : '400px';
        });
        this.showSpinner(false);
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
    Object.defineProperty(C2cLogin.prototype, "model", {
        get: function () { return this._model; },
        set: function (val) {
            this._model = val;
        },
        enumerable: true,
        configurable: true
    });
    C2cLogin.prototype.send = function () {
        var _this = this;
        this.eventService.emit({ key: "login", data: "sended from login" });
        if (!this._isSending) {
            this._isSending = true;
            this.showSpinner();
            setTimeout(function () {
                _this.showSpinner(false);
                _this._isSending = false;
            }, 3000);
        }
    };
    C2cLogin.prototype.showSpinner = function (show) {
        if (show === void 0) { show = true; }
        var spin = document.getElementById('spinBtnLogin');
        if (!show) {
            spin.innerHTML = '';
            this.btnSendTxt = this.resourceName;
        }
        else {
            this.btnSendTxt = '';
            spin.innerHTML = '<i class="fa fa fa-spinner fa-spin"></i>';
        }
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