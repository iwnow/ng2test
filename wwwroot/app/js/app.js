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
var browser_1 = require('angular2/platform/browser');
var MyApp = (function () {
    function MyApp() {
        this.images = ['1.jpg', '2.jpg', '3.jpg'];
    }
    MyApp.prototype.ngOnInit = function () {
        document.getElementById('startScreen').style.display = 'none';
    };
    MyApp.prototype.changedPage = function (pageName) {
        this.selectedPage = pageName;
    };
    MyApp = __decorate([
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/view/home.html',
            providers: []
        }), 
        __metadata('design:paramtypes', [])
    ], MyApp);
    return MyApp;
})();
browser_1.bootstrap(MyApp);
//# sourceMappingURL=app.js.map