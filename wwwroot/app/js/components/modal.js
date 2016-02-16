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
var C2cModal = (function () {
    function C2cModal() {
    }
    C2cModal.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], C2cModal.prototype, "show", void 0);
    C2cModal = __decorate([
        core_1.Component({
            selector: 'ctoc-modal',
            template: "<div class=\"modal in\" [style.display]=\"!show ? 'none' : 'block'\">\n\t<div class=\"modal-dialog\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">\u00D7</button>\n          <h4 class=\"modal-title\">Modal title</h4>\n        </div>\n        <div class=\"modal-body\">\n          Content for the dialog / modal goes here.\n        </div>\n        <div class=\"modal-footer\">\n          <a href=\"#\" data-dismiss=\"modal\" class=\"btn\">Close</a>\n          <a href=\"#\" class=\"btn btn-primary\">Save changes</a>\n        </div>\n      </div>\n    </div>\n</div>",
            inputs: ['show']
        }), 
        __metadata('design:paramtypes', [])
    ], C2cModal);
    return C2cModal;
})();
exports.C2cModal = C2cModal;
//# sourceMappingURL=modal.js.map