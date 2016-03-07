import {Component, OnInit, 
        OnDestroy, Input, Output,
        EventEmitter, OnChanges, ElementRef} from 'angular2/core';

//define
let __DEBUG__ = true;
//

@Component({
    selector: 'ctoc-grid',
    template: `
    <div class="ctoc-grid-head" 
        [scrollLeft]="leftScroll"
    >
        <table class="col-md-12 table-bordered table-striped table-condensed cf">
            <thead>
                <tr>
                    <th *ngFor="#col of columns">
                        <div [style.width.px]="col.width">{{col.name}}</div>
                    </th>
                    <th><div style="width:999999px"></div></th>
                </tr>
            </thead>
        </table>
    </div>
    <div class="ctoc-grid-data"
        (scroll)="dataScrollLeft($event)"
    >
        <table class="col-md-12 table-bordered table-striped table-condensed cf">
            <tbody>
                <tr *ngFor="#row of rowsView; #i = index"
                    [attr.data-selected]="row.selected"
                    [attr.data-rowid]="row.rowId"
                    (click)="selectRow(row)"
                    (dblclick)="dblclickRow(row)"
                >
                    <td *ngFor="#col of columns">
                        <div *ngIf="col.type == -1" 
                            [style.width.px]="col.width" align="center">
                            {{(currentPage-1)*_rowNumberPerPage + (i+1)}}
                        </div>
                        <div *ngIf="col.type == 0" 
                            [style.width.px]="col.width">
                            {{row.getCellValueByColumnId(col.id)}}
                        </div>
                        <div *ngIf="col.type == 2" 
                            [style.width.px]="col.width" align="center">
                            <img alt="User logo" [src]="row.getCellValueByColumnId(col.id)" 
                                class="img-circle img-responsive" > 
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>   
    <div>        
        <span>Страница&nbsp;
        <input type='text' #box
                (keyup.enter)="changePage(box.value); box.value=currentPage"
                (blur)="changePage(box.value); box.value=currentPage"
                [style.width.px]="35"
                [value]="currentPage">
        </span>
        <span>&nbsp;из&nbsp;{{pagesCount}}&nbsp;</span> |
        <span>Кол-во на странице:&nbsp;
        <input type='text' #box2
                (keyup.enter)="changeCountPerPage(box2.value); box2.value=_rowNumberPerPage"
                (blur)="changeCountPerPage(box2.value); box2.value=_rowNumberPerPage"
                [style.width.px]="35"
                [value]="_rowNumberPerPage">
        </span> | 
        <span>&nbsp;Всего:&nbsp;{{rowsCount}}</span>
        
    </div>
    `,
    styles: [`        
        .ctoc-grid-data {
            height: calc(100% - 60px);
            overflow: auto;
        }
        .ctoc-grid-head {
            overflow: hidden;
        }
        .ctoc-grid-data tr:hover {
            background-color: #42abca;
        }
        .ctoc-grid-data tr[data-selected='true'] {
            background-color: cornflowerblue;
        }
    `]
})
export class C2cGrid implements OnInit, OnDestroy {
    @Output() rowSelected: EventEmitter<C2cGridRow> = new EventEmitter<C2cGridRow>(true);
    @Output() rowDblClick: EventEmitter<C2cGridRow> = new EventEmitter<C2cGridRow>(true);
    
    @Input() schema: C2cGridSchema;    
    
    @Input() set data(val: C2cGridRow[]){
        this._data = val;
    }
    private _data: C2cGridRow[];
    
    private _rowNumberPerPage: number = 10;
    @Input() set rowNumberPerPage(val: number) {
        this._rowNumberPerPage = val;
    }
    
    get rowsCount(): number {
        return this._data ? this._data.length : 0;
    }
    
    get pagesCount(): number {
        if (!this._data || this._data.length == 0)
            return 1;
        return this._data.length % this._rowNumberPerPage == 0 ?
                this._data.length / this._rowNumberPerPage :
                Math.floor(this._data.length / this._rowNumberPerPage) + 1;  
    }
    
    private _currentViewPage: number = 1;
    get currentPage(): number {
        if (this._currentViewPage > this.pagesCount)
            this._currentViewPage = this.pagesCount;
        return this._currentViewPage;
    }
    set currentPage(val: number) {
        let reg = /^\d+$/;
        if (!reg.test(val.toString()) || val <= 0 || val > this.pagesCount) {
            return;   
        }
            
        this._currentViewPage = val;
    }
    
    private changePage(val: any) {
        this.currentPage = val;
    }
    
    changeCountPerPage(val: any){
        let reg = /^\d+$/;
        if (!reg.test(val.toString()) || val <= 0 ) {
            return;   
        }
            
        this._rowNumberPerPage = val;
    }
    
    private leftScroll: number;
    
    get columns(): C2cGridColumn[] {
        return this.schema ? this.schema.getSchema() : null;
    }
    
    get rowsView(): C2cGridRow[] {
        if (this.currentPage == this.pagesCount) 
            return this._data.slice(
                (this.currentPage-1)*this._rowNumberPerPage,
                this._data.length
            );            
        
        return this._data.slice(
            (this.currentPage-1)*this._rowNumberPerPage,
            (this.currentPage-1)*this._rowNumberPerPage + +this._rowNumberPerPage
        );
    }
    
    constructor(elem: ElementRef) {
        
    }
    
    ngOnInit() {
        this.leftScroll = 0;
    }
    
    ngOnDestroy() {
        
    }
    
    dataScrollLeft($event: any) {
        this.leftScroll = $event.target.scrollLeft
    }
    
    selectRow(row: C2cGridRow) {
        if (!row || row.selected)
            return;
        this.clearSelection();
        row.selected = true;
        this.rowSelected.emit(row);
    }
    
    dblclickRow(row: C2cGridRow) {
        this.rowDblClick.emit(row);
    }
    
    clearSelection() {
        this._data.forEach(i => {
           i.selected = false; 
        });
    }
    
    log(m: any) {
        logger.info(m);
    }
}

export class C2cGridRow {
    rowId: number;
    selected = false;
    
    constructor(private _dataCells: C2cGridDataCell[]) {
        this.rowId = C2cGridRow.newRowId;
    }
    
    getCellByColumnId(id: string): C2cGridDataCell {
        if (!this._dataCells)
            return undefined;
        return this._dataCells.find(i => i.columnRef.id == id);
    }
    
    getCellValueByColumnId(id: string): any {
        let cell = this.getCellByColumnId(id);
        return cell ? cell.val : '';
    }
    
    private static _rowid:number = 0;
    static get newRowId(): number {
        return ++C2cGridRow._rowid;
    }
}

export class C2cGridDataCell {
    constructor(public columnRef: C2cGridColumn, private _data: any){}
    
    get val(): any {
        return this._data;
    }
    set val(data: any) {
        this._data = data;
    }
}

export class C2cGridSchema {
    private _sc: C2cGridColumn[];
    
    constructor() {
        this._sc = [];
    }
    
    getSchema():C2cGridColumn[] {
        return this._sc.sort((a, b) => {
            return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
        });
    }
    
    addColumn(col: C2cGridColumn): C2cGridSchema {
        if (!col)
            return;
         if (this.hasColumnId(col.id))
            this._throwColumnAlreadyExist(col);
        this._sc.push(col);   
        return this;     
    }
    
    addRange(cols: C2cGridColumn[]): C2cGridSchema {
        if (!cols)
            return;
        let buf = this._sc;
        cols.forEach(i => {
            if (!this.hasColumnId(i.id)) {
                this._sc.push(i)
            }                
            else {
                this._sc = buf;
                this._throwColumnAlreadyExist(i);
            }            
        });
        return this;
    }
    
    private _throwColumnAlreadyExist(col: C2cGridColumn) {
        throw `Столбец с [id:${col.id}] уже существует в текущей схеме грида!`;
    }
    
    removeColumn(col: C2cGridColumn): C2cGridSchema {
        if (!col || !this.hasColumnId(col.id))
            return;
        this._sc.splice(this._sc.findIndex(i => i.id == col.id), 1);
        return this;
    }
    
    hasColumnId(id: string): boolean {
        return !!this._sc.find(i => i.id == id);
    }
    
    addCounter(): C2cGridSchema {
        this.addColumn(new C2cGridColumn('__counter__', '№', -9999, C2cGridColumnType.counter).setWidth(30));
        return this;
    }
    
    info(): string {
        return this.getSchema().map(i => i.id).join(',');
    }
}

export class C2cGridColumn {
    constructor(
        private _id:string, 
        private _name: string, 
        public order: number = 0, 
        private _type: C2cGridColumnType = C2cGridColumnType.txt){
            this.width = 200;
            this.height = 30;
        }
    
    get id(): string {
        return this._id;
    }
    get name(): string {
        return this._name;
    }
    set name(val: string) {
        this._name = val;
    }
    get type(): C2cGridColumnType {
        return this._type;
    }
    
    setWidth(val: number): C2cGridColumn {
        this.width = val;
        return this;
    }
    
    width: number;
    height: number;
    color: string;
}

export enum C2cGridColumnType {
    counter = -1,
    txt = 0,
    num = 1,
    pic = 2
}

let logger = {
    info: function (m: any) {
        if (__DEBUG__)
            console.dir(m);
    },
    error: function (e: any) {
        if (__DEBUG__)
            console.error(e);
    }
};