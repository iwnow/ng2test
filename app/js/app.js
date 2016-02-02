var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var user_1 = require('./user');
var core_1 = require('angular2/core');
var browser_1 = require('angular2/platform/browser');
var UserProvider = (function () {
    function UserProvider() {
        this._i = 23;
        this._usr = new user_1.User(++this._i, "Chad");
    }
    UserProvider.prototype.getUser = function () {
        return this._usr;
    };
    return UserProvider;
})();
var MyApp = (function () {
    function MyApp(userProvider) {
        document.getElementById('startScreen').style.display = 'none';
        this.person = userProvider.getUser();
        this.name = this.person.info();
        this.images = ['1.jpg', '2.jpg', '3.jpg'];
    }
    MyApp.prototype.changedPage = function (pageName) {
        this.selectedPage = pageName;
    };
    MyApp = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/views/home.html',
            providers: [UserProvider]
        }), 
        __metadata('design:paramtypes', [UserProvider])
    ], MyApp);
    return MyApp;
})();
browser_1.bootstrap(MyApp);
//# sourceMappingURL=app.js.map