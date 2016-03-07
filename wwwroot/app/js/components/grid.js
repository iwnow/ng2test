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
//define
var __DEBUG__ = true;
//
var C2cGrid = (function () {
    function C2cGrid(elem) {
        this.rowSelected = new core_1.EventEmitter(true);
        this.rowDblClick = new core_1.EventEmitter(true);
        this._rowNumberPerPage = 10;
        this._currentViewPage = 1;
    }
    Object.defineProperty(C2cGrid.prototype, "data", {
        set: function (val) {
            this._data = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cGrid.prototype, "rowNumberPerPage", {
        set: function (val) {
            this._rowNumberPerPage = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cGrid.prototype, "rowsCount", {
        get: function () {
            return this._data ? this._data.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cGrid.prototype, "pagesCount", {
        get: function () {
            if (!this._data || this._data.length == 0)
                return 1;
            return this._data.length % this._rowNumberPerPage == 0 ?
                this._data.length / this._rowNumberPerPage :
                Math.floor(this._data.length / this._rowNumberPerPage) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cGrid.prototype, "currentPage", {
        get: function () {
            if (this._currentViewPage > this.pagesCount)
                this._currentViewPage = this.pagesCount;
            return this._currentViewPage;
        },
        set: function (val) {
            var reg = /^\d+$/;
            if (!reg.test(val.toString()) || val <= 0 || val > this.pagesCount) {
                return;
            }
            this._currentViewPage = val;
        },
        enumerable: true,
        configurable: true
    });
    C2cGrid.prototype.changePage = function (val) {
        this.currentPage = val;
    };
    C2cGrid.prototype.changeCountPerPage = function (val) {
        var reg = /^\d+$/;
        if (!reg.test(val.toString()) || val <= 0) {
            return;
        }
        this._rowNumberPerPage = val;
    };
    Object.defineProperty(C2cGrid.prototype, "columns", {
        get: function () {
            return this.schema ? this.schema.getSchema() : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cGrid.prototype, "rowsView", {
        get: function () {
            if (this.currentPage == this.pagesCount)
                return this._data.slice((this.currentPage - 1) * this._rowNumberPerPage, this._data.length);
            return this._data.slice((this.currentPage - 1) * this._rowNumberPerPage, (this.currentPage - 1) * this._rowNumberPerPage + +this._rowNumberPerPage);
        },
        enumerable: true,
        configurable: true
    });
    C2cGrid.prototype.ngOnInit = function () {
        this.leftScroll = 0;
    };
    C2cGrid.prototype.ngOnDestroy = function () {
    };
    C2cGrid.prototype.dataScrollLeft = function ($event) {
        this.leftScroll = $event.target.scrollLeft;
    };
    C2cGrid.prototype.selectRow = function (row) {
        if (!row || row.selected)
            return;
        this.clearSelection();
        row.selected = true;
        this.rowSelected.emit(row);
    };
    C2cGrid.prototype.dblclickRow = function (row) {
        this.rowDblClick.emit(row);
    };
    C2cGrid.prototype.clearSelection = function () {
        this._data.forEach(function (i) {
            i.selected = false;
        });
    };
    C2cGrid.prototype.log = function (m) {
        logger.info(m);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], C2cGrid.prototype, "rowSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], C2cGrid.prototype, "rowDblClick", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', C2cGridSchema)
    ], C2cGrid.prototype, "schema", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], C2cGrid.prototype, "data", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], C2cGrid.prototype, "rowNumberPerPage", null);
    C2cGrid = __decorate([
        core_1.Component({
            selector: 'ctoc-grid',
            template: "\n    <div class=\"ctoc-grid-head\" \n        [scrollLeft]=\"leftScroll\"\n    >\n        <table class=\"col-md-12 table-bordered table-striped table-condensed cf\">\n            <thead>\n                <tr>\n                    <th *ngFor=\"#col of columns\">\n                        <div [style.width.px]=\"col.width\">{{col.name}}</div>\n                    </th>\n                    <th><div style=\"width:999999px\"></div></th>\n                </tr>\n            </thead>\n        </table>\n    </div>\n    <div class=\"ctoc-grid-data\"\n        (scroll)=\"dataScrollLeft($event)\"\n    >\n        <table class=\"col-md-12 table-bordered table-striped table-condensed cf\">\n            <tbody>\n                <tr *ngFor=\"#row of rowsView; #i = index\"\n                    [attr.data-selected]=\"row.selected\"\n                    [attr.data-rowid]=\"row.rowId\"\n                    (click)=\"selectRow(row)\"\n                    (dblclick)=\"dblclickRow(row)\"\n                >\n                    <td *ngFor=\"#col of columns\">\n                        <div *ngIf=\"col.type == -1\" \n                            [style.width.px]=\"col.width\" align=\"center\">\n                            {{(currentPage-1)*_rowNumberPerPage + (i+1)}}\n                        </div>\n                        <div *ngIf=\"col.type == 0\" \n                            [style.width.px]=\"col.width\">\n                            {{row.getCellValueByColumnId(col.id)}}\n                        </div>\n                        <div *ngIf=\"col.type == 2\" \n                            [style.width.px]=\"col.width\" align=\"center\">\n                            <img alt=\"User logo\" [src]=\"row.getCellValueByColumnId(col.id)\" \n                                class=\"img-circle img-responsive\" > \n                        </div>\n                    </td>\n                </tr>\n            </tbody>\n        </table>\n    </div>   \n    <div>        \n        <span>\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430&nbsp;\n        <input type='text' #box\n                (keyup.enter)=\"changePage(box.value); box.value=currentPage\"\n                (blur)=\"changePage(box.value); box.value=currentPage\"\n                [style.width.px]=\"35\"\n                [value]=\"currentPage\">\n        </span>\n        <span>&nbsp;\u0438\u0437&nbsp;{{pagesCount}}&nbsp;</span> |\n        <span>\u041A\u043E\u043B-\u0432\u043E \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435:&nbsp;\n        <input type='text' #box2\n                (keyup.enter)=\"changeCountPerPage(box2.value); box2.value=_rowNumberPerPage\"\n                (blur)=\"changeCountPerPage(box2.value); box2.value=_rowNumberPerPage\"\n                [style.width.px]=\"35\"\n                [value]=\"_rowNumberPerPage\">\n        </span> | \n        <span>&nbsp;\u0412\u0441\u0435\u0433\u043E:&nbsp;{{rowsCount}}</span>\n        \n    </div>\n    ",
            styles: ["        \n        .ctoc-grid-data {\n            height: calc(100% - 60px);\n            overflow: auto;\n        }\n        .ctoc-grid-head {\n            overflow: hidden;\n        }\n        .ctoc-grid-data tr:hover {\n            background-color: #42abca;\n        }\n        .ctoc-grid-data tr[data-selected='true'] {\n            background-color: cornflowerblue;\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], C2cGrid);
    return C2cGrid;
})();
exports.C2cGrid = C2cGrid;
var C2cGridRow = (function () {
    function C2cGridRow(_dataCells) {
        this._dataCells = _dataCells;
        this.selected = false;
        this.rowId = C2cGridRow.newRowId;
    }
    C2cGridRow.prototype.getCellByColumnId = function (id) {
        if (!this._dataCells)
            return undefined;
        return this._dataCells.find(function (i) { return i.columnRef.id == id; });
    };
    C2cGridRow.prototype.getCellValueByColumnId = function (id) {
        var cell = this.getCellByColumnId(id);
        return cell ? cell.val : '';
    };
    Object.defineProperty(C2cGridRow, "newRowId", {
        get: function () {
            return ++C2cGridRow._rowid;
        },
        enumerable: true,
        configurable: true
    });
    C2cGridRow._rowid = 0;
    return C2cGridRow;
})();
exports.C2cGridRow = C2cGridRow;
var C2cGridDataCell = (function () {
    function C2cGridDataCell(columnRef, _data) {
        this.columnRef = columnRef;
        this._data = _data;
    }
    Object.defineProperty(C2cGridDataCell.prototype, "val", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
        },
        enumerable: true,
        configurable: true
    });
    return C2cGridDataCell;
})();
exports.C2cGridDataCell = C2cGridDataCell;
var C2cGridSchema = (function () {
    function C2cGridSchema() {
        this._sc = [];
    }
    C2cGridSchema.prototype.getSchema = function () {
        return this._sc.sort(function (a, b) {
            return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
        });
    };
    C2cGridSchema.prototype.addColumn = function (col) {
        if (!col)
            return;
        if (this.hasColumnId(col.id))
            this._throwColumnAlreadyExist(col);
        this._sc.push(col);
        return this;
    };
    C2cGridSchema.prototype.addRange = function (cols) {
        var _this = this;
        if (!cols)
            return;
        var buf = this._sc;
        cols.forEach(function (i) {
            if (!_this.hasColumnId(i.id)) {
                _this._sc.push(i);
            }
            else {
                _this._sc = buf;
                _this._throwColumnAlreadyExist(i);
            }
        });
        return this;
    };
    C2cGridSchema.prototype._throwColumnAlreadyExist = function (col) {
        throw "\u0421\u0442\u043E\u043B\u0431\u0435\u0446 \u0441 [id:" + col.id + "] \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442 \u0432 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0441\u0445\u0435\u043C\u0435 \u0433\u0440\u0438\u0434\u0430!";
    };
    C2cGridSchema.prototype.removeColumn = function (col) {
        if (!col || !this.hasColumnId(col.id))
            return;
        this._sc.splice(this._sc.findIndex(function (i) { return i.id == col.id; }), 1);
        return this;
    };
    C2cGridSchema.prototype.hasColumnId = function (id) {
        return !!this._sc.find(function (i) { return i.id == id; });
    };
    C2cGridSchema.prototype.addCounter = function () {
        this.addColumn(new C2cGridColumn('__counter__', '№', -9999, C2cGridColumnType.counter).setWidth(30));
        return this;
    };
    C2cGridSchema.prototype.info = function () {
        return this.getSchema().map(function (i) { return i.id; }).join(',');
    };
    return C2cGridSchema;
})();
exports.C2cGridSchema = C2cGridSchema;
var C2cGridColumn = (function () {
    function C2cGridColumn(_id, _name, order, _type) {
        if (order === void 0) { order = 0; }
        if (_type === void 0) { _type = C2cGridColumnType.txt; }
        this._id = _id;
        this._name = _name;
        this.order = order;
        this._type = _type;
        this.width = 200;
        this.height = 30;
    }
    Object.defineProperty(C2cGridColumn.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cGridColumn.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (val) {
            this._name = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(C2cGridColumn.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    C2cGridColumn.prototype.setWidth = function (val) {
        this.width = val;
        return this;
    };
    return C2cGridColumn;
})();
exports.C2cGridColumn = C2cGridColumn;
(function (C2cGridColumnType) {
    C2cGridColumnType[C2cGridColumnType["counter"] = -1] = "counter";
    C2cGridColumnType[C2cGridColumnType["txt"] = 0] = "txt";
    C2cGridColumnType[C2cGridColumnType["num"] = 1] = "num";
    C2cGridColumnType[C2cGridColumnType["pic"] = 2] = "pic";
})(exports.C2cGridColumnType || (exports.C2cGridColumnType = {}));
var C2cGridColumnType = exports.C2cGridColumnType;
var logger = {
    info: function (m) {
        if (__DEBUG__)
            console.dir(m);
    },
    error: function (e) {
        if (__DEBUG__)
            console.error(e);
    }
};
//# sourceMappingURL=grid.js.map