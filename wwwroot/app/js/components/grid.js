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
var C2cGrid = (function () {
    function C2cGrid() {
        this.selectedElement = new core_1.EventEmitter(true);
    }
    C2cGrid.prototype.ngOnInit = function () {
        if (this.gridColScheme == null)
            this.gridColScheme = new C2cGridColumnsScheme();
        if (this.itemsCountPerPage == null)
            this.itemsCountPerPage = 5;
        this.updatePagBtn();
    };
    C2cGrid.prototype.ngOnChanges = function (changes) {
        // trace changes this
    };
    C2cGrid.prototype.chooseContact = function (contact) {
        this.data.forEach(function (c) {
            c.choosed = false;
        });
        contact.choosed = true;
        this.selectedElement.emit(contact);
    };
    C2cGrid.prototype.clearSelection = function () {
        this.data.forEach(function (c) {
            c.choosed = false;
        });
        this.selectedElement.emit(null);
    };
    Object.defineProperty(C2cGrid.prototype, "dataPerPage", {
        get: function () {
            if (!this.data)
                return null;
            var start = (this.currentPage - 1) * this.itemsCountPerPage;
            return this.data.slice(start, start + this.itemsCountPerPage);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cGrid.prototype, "countPages", {
        get: function () {
            return (this.data.length % this.itemsCountPerPage) == 0 ?
                this.data.length / this.itemsCountPerPage :
                Math.floor(this.data.length / this.itemsCountPerPage) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cGrid.prototype, "paginationBtn", {
        get: function () {
            if (this.currentPage > this.countPages) {
                this.updatePagBtn();
                this.pagClick(this._paginationBtn[0]);
            }
            return this._paginationBtn;
        },
        set: function (val) {
            this._paginationBtn = val;
        },
        enumerable: true,
        configurable: true
    });
    C2cGrid.prototype.updatePagBtn = function () {
        var pb;
        if (!this.data)
            return null;
        var countBtn = this.countPages > 5 ? 5 : this.countPages;
        var btnArr = [];
        for (var i = 1; i <= countBtn; i++) {
            pb = i == 1 ? { active: true, num: i } : { active: false, num: i };
            btnArr.push(pb);
        }
        this.paginationBtn = btnArr;
        this.currentPage = 1;
    };
    C2cGrid.prototype.pagClick = function (pag) {
        if (pag.num == this.currentPage)
            return;
        this.paginationBtn.forEach(function (b) {
            b.active = false;
        });
        pag.active = true;
        this.currentPage = pag.num;
        this.clearSelection();
    };
    C2cGrid.prototype.goToPage = function (num) {
        if (num > this.countPages)
            return;
        var ind = this.paginationBtn.findIndex(function (i) { return i.num == num; });
        if (ind) {
            this.pagClick(this.paginationBtn[ind]);
            return;
        }
    };
    C2cGrid.prototype.pagForwardClick = function () {
        console.log(this.currentPage + " - " + this.countPages);
        if (this.currentPage >= this.countPages)
            return;
        if (this.paginationBtn[this.paginationBtn.length - 1].num > this.currentPage) {
            this.pagClick(this.paginationBtn[this.currentPage - this.paginationBtn[0].num + 1]);
            return;
        }
        var cp = this.currentPage;
        this.paginationBtn = this.paginationBtn.slice(1);
        this.paginationBtn.push({ num: cp + 1, active: false });
        this.pagClick(this.paginationBtn[this.paginationBtn.length - 1]);
    };
    C2cGrid.prototype.pagBackClick = function () {
        if (this.currentPage == 1)
            return;
        if (this.paginationBtn[0].num < this.currentPage) {
            this.pagClick(this.paginationBtn[this.currentPage - this.paginationBtn[0].num - 1]);
            return;
        }
        this.paginationBtn = this.paginationBtn.slice(0, this.paginationBtn.length - 1);
        this.paginationBtn.unshift({ num: this.currentPage - 1, active: false });
        this.pagClick(this.paginationBtn[0]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', C2cGridColumnsScheme)
    ], C2cGrid.prototype, "gridColScheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], C2cGrid.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], C2cGrid.prototype, "itemsCountPerPage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], C2cGrid.prototype, "selectedElement", void 0);
    C2cGrid = __decorate([
        core_1.Component({
            selector: 'ctoc-grid',
            template: "\n        <table class=\"col-md-12 table-bordered table-striped table-condensed cf\">\n            <thead>\n                <tr>\n                    <th *ngFor=\"#colsc of gridColScheme.scheme\">{{colsc.column.name}}</th>\n                </tr>\n            </thead>\n            <tbody style=\"height:200px;\">\n                <tr *ngFor=\"#contact of dataPerPage\" class=\"ctoc-tr\" \n                    [ngClass]=\"contact.choosed ? 'sel' : ''\"\n                    (click)=\"chooseContact(contact)\">\n                    <td *ngFor=\"#colsc of gridColScheme.scheme\">\n                        <span *ngIf=\"colsc.column.type != 2\">{{contact[colsc.column.id]}}</span>\n                        <div *ngIf=\"colsc.column.type == 2\" align=\"center\">\n                            <img  [src]=\"contact[colsc.column.id]\" class=\"img-circle\" alt=\"avatar\" width=\"60\" height=\"60\">\n                        </div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n        <div>\n            <ul class=\"pagination \">\n                <li (click)=\"pagBackClick()\"><a href=\"#\"><span class=\"glyphicon glyphicon-backward\"></span></a></li>\n                <li *ngFor=\"#pag of paginationBtn\"\n                    [ngClass]=\"pag.active ? 'active' : ''\"\n                    (click)=\"pagClick(pag)\">\n                    <a href=\"#\">{{pag.num}}</a>\n                </li>\n                <li (click)=\"pagForwardClick()\"><a href=\"#\"><span class=\"glyphicon glyphicon-forward\"></span></a></li>\n            </ul>\n        </div>        \n    ",
            styles: ["\n        tr.ctoc-tr:hover {\n            background-color: cornflowerblue;\n        }\n        tr.ctoc-tr.sel {\n            background-color: #428bca;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [])
    ], C2cGrid);
    return C2cGrid;
})();
exports.C2cGrid = C2cGrid;
//      givenName: string; 
//     familyName: string; 
//     middleName: string;
//     mail: string;         
//     position: string;        
//     subdivision: string;
//     mobilePhone: string; 
//     workPhone: string;
//     internalPhone: string;
//     avatar: string;
var C2cGridColumnsScheme = (function () {
    function C2cGridColumnsScheme(_sc) {
        if (_sc === void 0) { _sc = null; }
        if (_sc == null)
            this.getDefaultScheme();
        else {
            this._sc = _sc;
            var keys = [];
            this._sc.forEach(function (i) {
                var k = i.column.id;
                if (keys.indexOf(k) > -1)
                    throw "[C2cGridColumnsScheme] \u0412 \u0441\u0445\u0435\u043C\u0435 \u0433\u0440\u0438\u0434\u0430 \u0443\u0436\u0435 \u0434\u043E\u0431\u0430\u0432\u0435\u043D \u043A\u043B\u044E\u0447 [" + k + "]";
                keys.push(k);
            });
        }
    }
    Object.defineProperty(C2cGridColumnsScheme.prototype, "scheme", {
        get: function () {
            return this._sc;
        },
        enumerable: true,
        configurable: true
    });
    C2cGridColumnsScheme.prototype.getDefaultScheme = function () {
        this._sc = [{
                order: 0,
                column: new C2cGridColumn('avatar', 'Picture', C2cGridColumnType.pic)
            }, {
                order: 1,
                column: new C2cGridColumn('familyName', 'Family Name')
            }, {
                order: 2,
                column: new C2cGridColumn('givenName', 'Given Name')
            }, {
                order: 3,
                column: new C2cGridColumn('middleName', 'Middle Name')
            }, {
                order: 4,
                column: new C2cGridColumn('mail', 'Email')
            }, {
                order: 5,
                column: new C2cGridColumn('mobilePhone', 'Mobile Phone')
            }, {
                order: 6,
                column: new C2cGridColumn('workPhone', 'Work Phone')
            }, {
                order: 7,
                column: new C2cGridColumn('internalPhone', 'Internal Phone')
            }
        ];
    };
    return C2cGridColumnsScheme;
})();
exports.C2cGridColumnsScheme = C2cGridColumnsScheme;
var C2cGridColumn = (function () {
    function C2cGridColumn(id, name, type) {
        if (type === void 0) { type = C2cGridColumnType.txt; }
        this.id = id;
        this.name = name;
        this.type = type;
    }
    return C2cGridColumn;
})();
exports.C2cGridColumn = C2cGridColumn;
(function (C2cGridColumnType) {
    C2cGridColumnType[C2cGridColumnType["txt"] = 0] = "txt";
    C2cGridColumnType[C2cGridColumnType["num"] = 1] = "num";
    C2cGridColumnType[C2cGridColumnType["pic"] = 2] = "pic";
})(exports.C2cGridColumnType || (exports.C2cGridColumnType = {}));
var C2cGridColumnType = exports.C2cGridColumnType;
//# sourceMappingURL=grid.js.map