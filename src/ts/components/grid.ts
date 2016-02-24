import {Component, OnInit, 
        OnDestroy, Input, Output,
        EventEmitter, OnChanges} from 'angular2/core';

import {ContactMock} from '../mocks/all';

@Component({
    selector: 'ctoc-grid',
    template: `
        <table class="col-md-12 table-bordered table-striped table-condensed cf">
            <thead>
                <tr>
                    <th *ngFor="#colsc of gridColScheme.scheme">{{colsc.column.name}}</th>
                </tr>
            </thead>
            <tbody style="height:200px;">
                <tr *ngFor="#contact of dataPerPage" class="ctoc-tr" 
                    [ngClass]="contact.choosed ? 'sel' : ''"
                    (click)="chooseContact(contact)">
                    <td *ngFor="#colsc of gridColScheme.scheme">
                        <span *ngIf="colsc.column.type != 2">{{contact[colsc.column.id]}}</span>
                        <div *ngIf="colsc.column.type == 2" align="center">
                            <img  [src]="contact[colsc.column.id]" class="img-circle" alt="avatar" width="60" height="60">
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <div>
            <ul class="pagination ">
                <li (click)="pagBackClick()"><a href="#"><span class="glyphicon glyphicon-backward"></span></a></li>
                <li *ngFor="#pag of paginationBtn"
                    [ngClass]="pag.active ? 'active' : ''"
                    (click)="pagClick(pag)">
                    <a href="#">{{pag.num}}</a>
                </li>
                <li (click)="pagForwardClick()"><a href="#"><span class="glyphicon glyphicon-forward"></span></a></li>
            </ul>
        </div>        
    `,
    styles: [`
        tr.ctoc-tr:hover {
            background-color: cornflowerblue;
        }
        tr.ctoc-tr.sel {
            background-color: #428bca;
        }
    `]
})
export class C2cGrid implements OnInit, OnChanges {
    @Input() gridColScheme: C2cGridColumnsScheme;
    @Input() data: any[];
    @Input() itemsCountPerPage: number;
    @Output() selectedElement: EventEmitter<any> = new EventEmitter<any>(true);
    
    currentPage: number;   
    viewTableData: any[]; 
    
    ngOnInit() {
        if (this.gridColScheme == null) 
            this.gridColScheme = new C2cGridColumnsScheme();
        if (this.itemsCountPerPage == null)
            this.itemsCountPerPage = 5;        
        this.updatePagBtn();        
    }
    
    ngOnChanges(changes){
        // trace changes this
    }
    
    chooseContact(contact: any) {
        this.data.forEach((c) => {
            c.choosed = false;
        });
        contact.choosed = true;
        this.selectedElement.emit(contact);
    }
    
    clearSelection() {
        this.data.forEach((c) => {
            c.choosed = false;
        });
        this.selectedElement.emit(null);
    }
    
    get dataPerPage(): any[] {
        if (!this.data)
            return null;
        let start = (this.currentPage-1)*this.itemsCountPerPage;
        return this.data.slice(start, start + this.itemsCountPerPage);
    }
    
    get countPages():number {
        return (this.data.length % this.itemsCountPerPage) == 0 ?  
                        this.data.length / this.itemsCountPerPage : 
                        Math.floor(this.data.length / this.itemsCountPerPage) + 1;
    }
    
    _paginationBtn: any[];
    get paginationBtn(): any[] {
        if (this.currentPage > this.countPages) {
            this.updatePagBtn();
            this.pagClick(this._paginationBtn[0]);
        }            
        return this._paginationBtn;
    }
    set paginationBtn(val: any[]) {
        this._paginationBtn = val;
    }
    
    updatePagBtn(){
        let pb:{active: boolean, num: number};
        if (!this.data)
            return null;
        let countBtn = this.countPages > 5 ? 5 : this.countPages;
        let btnArr = [];
        for (let i = 1; i <= countBtn; i++) {
            pb = i==1 ? {active:true,num:i} : {active:false,num:i};
            btnArr.push(pb);            
        }        
        this.paginationBtn = btnArr;
        this.currentPage = 1;
    }
    
    pagClick(pag: any) {
        if (pag.num == this.currentPage)
            return;
        this.paginationBtn.forEach((b) => {
            b.active = false;
        });
        pag.active = true;
        this.currentPage = pag.num;
        this.clearSelection();
    }
    
    goToPage(num: number) {
        if (num > this.countPages)
            return;
        let ind = this.paginationBtn.findIndex((i) => i.num == num);
        if (ind) {
            this.pagClick(this.paginationBtn[ind]);
            return;
        }
        
    }
    
    
    pagForwardClick() {
        console.log(`${this.currentPage} - ${this.countPages}`);
        if (this.currentPage >= this.countPages)
            return;
        if (this.paginationBtn[this.paginationBtn.length-1].num > this.currentPage) {
            this.pagClick(this.paginationBtn[this.currentPage-this.paginationBtn[0].num + 1]);
            return;
        }
        let cp = this.currentPage;
        this.paginationBtn = this.paginationBtn.slice(1);
        this.paginationBtn.push({num:cp+1, active:false});
        this.pagClick(this.paginationBtn[this.paginationBtn.length-1]);
    }
    
    pagBackClick() {
        if (this.currentPage == 1)
            return;           
        if (this.paginationBtn[0].num < this.currentPage) {
            this.pagClick(this.paginationBtn[this.currentPage-this.paginationBtn[0].num-1]);  
            return;
        }
        this.paginationBtn = this.paginationBtn.slice(0,this.paginationBtn.length-1);
        this.paginationBtn.unshift({num:this.currentPage-1, active:false});
        this.pagClick(this.paginationBtn[0]);
    }
}

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
export interface IC2cGridScheme {
    column: C2cGridColumn; 
    order: number;
}
export class C2cGridColumnsScheme {
    _sc: IC2cGridScheme[];
    
    get scheme(): IC2cGridScheme[] {
        return this._sc;
    }
    
    constructor(_sc: [{column: C2cGridColumn, order: number}] = null) {
        if (_sc == null)
            this.getDefaultScheme();
        else {
            this._sc = _sc;
            let keys: string[] = [];
            this._sc.forEach((i) => {
                let k = i.column.id;
                if (keys.indexOf(k) > -1)
                    throw `[C2cGridColumnsScheme] В схеме грида уже добавен ключ [${k}]`;
                keys.push(k);
            });          
        } 
    }
    
    getDefaultScheme() {
        this._sc = [ {
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
    }
} 

export class C2cGridColumn {
    constructor(public id:string, public name: string, public type:C2cGridColumnType = C2cGridColumnType.txt){}
}

export enum C2cGridColumnType {
    txt = 0,
    num = 1,
    pic = 2
}