import {Component, OnInit, OnDestroy, Output, EventEmitter} from 'angular2/core';

import {ServiceLocator} from '../services/all';
import {IUserInfo, IUserService, IEmitData, IEventService, Cultures, IResourceService} from '../contracts/all';
import {Descriptors, Validators} from '../utils/all';
import {Contact} from '../models/all';
import {ContactMock} from '../mocks/all';
import * as grid from './grid';
import {C2cContactEdit} from './contact-edit';

let __DEBUG__ = true;

@Component({
    selector: 'ctoc-contacts',
    template: `
    <div *ngIf="!_viewIsEditing" class="contacts-panel">
        <div class="grid-menu">
            <div class="btn-group">
                <button [title]="_resx ? _resx.tableMenu.save : ''" type="button" class="btn btn-default"
                    (click)="saveContacts()"
                    >
                    <span class="glyphicon glyphicon-floppy-save"></span>
                </button>
                <button [title]="_resx ? _resx.tableMenu.add : ''" type="button" class="btn btn-default"
                    (click)="addContact()"
                    >
                    <span class="glyphicon glyphicon-plus"></span>
                </button>
                <button [title]="_resx ? _resx.tableMenu.edit : ''" type="button" class="btn btn-default"
                    (click)="editContact()"
                    >
                    <span class="glyphicon glyphicon-edit"></span>
                </button>
                <button [title]="_resx ? _resx.tableMenu.delete : ''" type="button" class="btn btn-default"
                    (click)="removeContact()">
                    <span class="glyphicon glyphicon-remove"></span>
                </button>
                <button [title]="_resx ? _resx.tableMenu.xls : ''" type="button" class="btn btn-default">
                    <span class="glyphicon glyphicon-folder-open"></span>
                </button>
            </div>
        </div>
    
        <div style="height:calc(100% - 49px)">
            <ctoc-grid
                [schema]="_gridSchema"
                [data]="_dataGrid"
                [rowNumberPerPage]="_rowPerPage"
                (rowDblClick)="gridRowDblClick($event)"
                (rowSelected)="gridRowSelected($event)"
            >
            </ctoc-grid>
        </div>
    </div>
    <div *ngIf="_viewIsEditing" class="contacts-panel">
        <ctoc-contact-edit 
            (ok)="fromEdit($event)"
            (cancel)="cancelEdit()"
            [addOrEdit]="_addOrEdit"
            [model]="_modelToEdit"
        ></ctoc-contact-edit>
    </div>
    
    `,
    directives: [grid.C2cGrid, C2cContactEdit],
    styles: [`
        .grid-menu {
            margin-bottom: 15px;
        }
        .contacts-panel {
            height: calc(100% - 60px);
        }
    `]
})
export class C2cContacts implements OnInit, OnDestroy {
    @Output() dataChanged = new EventEmitter<boolean>();
    
    private _contacts: Contact[];
    private _gridSchema: grid.C2cGridSchema;
    private _resx: any;
    private _langChangeSubscription: any;
    private _dataGrid: grid.C2cGridRow[];
    
    private _rowPerPage = 10;    
    private _viewIsEditing = false;
    private _addOrEdit = false;
    private _modelToEdit: Contact;
    private _currentSelectedRow: grid.C2cGridRow;
    
    
    
    constructor(private _locator: ServiceLocator){}
    
    ngOnInit() {
        this.registerLangChanged();
        this._locator.getService<IResourceService>('IResourceService')
            .getResource()
            .subscribe(data => {
                this.updateCultureUI(data.controlPanel.contactsPan);
            });
        this._gridSchema = this.getSchemeColumns();
        this._contacts = this.getContacts();
        this._dataGrid = this.toDataGrid(this._contacts);
    }
    
    ngOnDestroy() {
        this._langChangeSubscription.unsubscribe();
    }
    
    private get userService(): IUserService {
        return this._locator.getService<IUserService>('IUserService');
    }
    private get eventService(): IEventService {
        return this._locator.getService<IEventService>('IEventService');
    }
    
    private registerLangChanged(){
        this._langChangeSubscription = this.eventService.subscribe(Descriptors.LanguageChange, (data) => {
            this.updateResource(data);
        });
    }
    
    private updateCultureUI(resx: any){
        if (!resx) {
            this.eventService.emit({key: Descriptors.Exceptions, data: '[contact.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!'});
            return;
        }
        this._resx = resx; 
        this._gridSchema = this.updateGridResxByRef(this._gridSchema);
    }
    
    private updateResource(culture: Cultures){
        this._locator.getService<IResourceService>('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(data => {
                this.updateCultureUI(data.controlPanel.contactsPan);
            });
    }
    private updateGridResxByRef(sc:grid.C2cGridSchema):grid.C2cGridSchema {  
        if (!sc) return;      
        let buf = sc.getSchema();
        buf.forEach((i) => {
            i.name = this._resx.table[i.id] || i.name;
        });
        let nb = new grid.C2cGridSchema();
        nb.addRange(buf); 
        return nb;
    }
    
    private getContacts():Contact[] {
        return ContactMock.getContacts(13);
    }
    
    private gridRowDblClick(row: grid.C2cGridRow) {
        this.showEditPanel(false, row.getTag());
    }
    
    private gridRowSelected(row: grid.C2cGridRow) {
        this._currentSelectedRow = row;
    }
    
    private editContact() {
        if (!this._currentSelectedRow)
            return;
        this.showEditPanel(false, this._currentSelectedRow.getTag());
    }
    
    private fromEdit(c:Contact) {
        if (this._addOrEdit) {
            this._contacts.push(c);               
        } else {
            let ind = this._contacts.findIndex(i => i.id == c.id);
            this._contacts[ind] = c;
        }
        this._dataGrid = this.toDataGrid(this._contacts);
        this.dataChanged.emit(true);
        this.hideEditPanel();
    }
    
    private cancelEdit() {
        this.hideEditPanel();
    }
    
    private addContact() {
        this.showEditPanel(true);
    }
    
    private showEditPanel(addOrEdit: boolean, model: Contact = null) {
        this._addOrEdit = addOrEdit;
        this._viewIsEditing = true;
        this._modelToEdit = model;
    }
    
    private hideEditPanel() {
        this._viewIsEditing = false;
    }
    
    private saveContacts() {
        this.dataChanged.emit(false);
    }
    
    private getSchemeColumns(): grid.C2cGridSchema {
        let s = new grid.C2cGridSchema();
        let ava = new grid.C2cGridColumn('avatar', 'avatar', 0, grid.C2cGridColumnType.pic);
        ava.width = 50;
        s.addRange([
            new grid.C2cGridColumn('givenName', 'givenName', 1),
            new grid.C2cGridColumn('familyName', 'familyName', 2),
            new grid.C2cGridColumn('middleName', 'middleName', 3),
            new grid.C2cGridColumn('mail', 'mail', 4),
            new grid.C2cGridColumn('position', 'position', 5),
            new grid.C2cGridColumn('subdivision', 'subdivision', 6),
            new grid.C2cGridColumn('mobilePhone', 'mobilePhone', 7),
            new grid.C2cGridColumn('workPhone', 'workPhone', 8),
            new grid.C2cGridColumn('internalPhone', 'internalPhone', 9),
            ava
        ]).addCounter();
        return s;
    }
    
    private toDataGrid(cs: Contact[]): grid.C2cGridRow[] {
        let cols = this._gridSchema.getSchema();
        return cs.map(c => {
            return new grid.C2cGridRow([
                new grid.C2cGridDataCell(cols.find(i => i.id == 'givenName'), c.givenName),
                new grid.C2cGridDataCell(cols.find(i => i.id == 'familyName'), c.familyName),
                new grid.C2cGridDataCell(cols.find(i => i.id == 'middleName'), c.middleName),
                new grid.C2cGridDataCell(cols.find(i => i.id == 'mail'), c.mail),
                new grid.C2cGridDataCell(cols.find(i => i.id == 'position'), c.position),
                new grid.C2cGridDataCell(cols.find(i => i.id == 'subdivision'), c.subdivision),
                new grid.C2cGridDataCell(cols.find(i => i.id == 'mobilePhone'), c.mobilePhone),
                new grid.C2cGridDataCell(cols.find(i => i.id == 'workPhone'), c.workPhone),
                new grid.C2cGridDataCell(cols.find(i => i.id == 'internalPhone'), c.internalPhone),
                new grid.C2cGridDataCell(cols.find(i => i.id == 'avatar'), c.avatar)
            ]).setTag(c);
        });
    }
    
    private log(m:any) {
        if (__DEBUG__) {
            console.log(m);
        }        
    }
    
    private removeContact() {
        if (!this._currentSelectedRow)
            return;
        let c = <Contact>this._currentSelectedRow.getTag();
        let ind = this._contacts.findIndex(i => i.id == c.id);
        if (!ind || ind < 0)
            return;
        this._contacts.splice(ind, 1);
        this._dataGrid = this.toDataGrid(this._contacts);
        this.dataChanged.emit(true);
        this._currentSelectedRow = null;
    }
    
}