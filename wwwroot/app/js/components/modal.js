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
var C2cModal = (function () {
    function C2cModal(_events) {
        this._events = _events;
        this.close = new core_1.EventEmitter(true);
        this.ok = new core_1.EventEmitter(true);
        var h = window.innerHeight;
        console.log(h);
        this.topOffsetModal = h / 4 + 'px';
    }
    C2cModal.prototype.ngOnInit = function () {
        var _this = this;
        this._winResizeSub = this._events.subscribe(all_2.Descriptors.WinResize, function (data) {
            _this.topOffsetModal = data.height / 4 + 'px';
        });
    };
    C2cModal.prototype.closeModal = function () {
        this.close.emit({});
    };
    C2cModal.prototype.okModal = function () {
        this.ok.emit({});
    };
    C2cModal.prototype.ngOnDestroy = function () {
        this._winResizeSub.unsubscribe();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], C2cModal.prototype, "show", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], C2cModal.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], C2cModal.prototype, "msg", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], C2cModal.prototype, "close", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], C2cModal.prototype, "ok", void 0);
    C2cModal = __decorate([
        core_1.Component({
            selector: 'ctoc-modal',
            template: "<div class=\"modal in\" \n                [style.display]=\"!show ? 'none' : 'block'\"\n                [style.margin-top]=\"topOffsetModal\">\n                <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                    <button type=\"button\" (click)=\"closeModal()\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\u00D7</button>\n                    <h4 class=\"modal-title\">{{title}}</h4>\n                    </div>\n                    <div class=\"modal-body\">\n                    {{msg}}\n                    </div>\n                    <div class=\"modal-footer\">\n                        <a href=\"#\" (click)=\"okModal()\" class=\"btn btn-primary\">Ok</a>\n                    </div>\n                </div>\n                </div>\n            </div>",
            inputs: ['show']
        }), 
        __metadata('design:paramtypes', [all_1.EventService])
    ], C2cModal);
    return C2cModal;
})();
exports.C2cModal = C2cModal;
//# sourceMappingURL=modal.js.map