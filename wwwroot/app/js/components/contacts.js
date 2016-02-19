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
var all_1 = require('../mocks/all');
var C2cContacts = (function () {
    function C2cContacts() {
    }
    C2cContacts.prototype.ngOnInit = function () {
        if (!this._contacts)
            this._contacts = this.getContacts();
    };
    C2cContacts.prototype.getContacts = function () {
        console.log('loading contacts...');
        return all_1.ContactMock.getContacts(20);
    };
    C2cContacts = __decorate([
        core_1.Component({
            selector: 'ctoc-contacts',
            template: "\n        <div class=\"page-header\">menu items</div>\n        <div *ngFor=\"#cntc of _contacts\">\n            {{cntc.givenName}}-{{cntc.familyName}}-{{cntc.mobilePhone}} \n        </div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], C2cContacts);
    return C2cContacts;
})();
exports.C2cContacts = C2cContacts;
//# sourceMappingURL=contacts.js.map