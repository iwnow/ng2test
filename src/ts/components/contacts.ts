import {Component, OnInit, OnDestroy} from 'angular2/core';

import {ServiceLocator} from '../services/all';
import {IUserInfo, IUserService, IEmitData, IEventService, Cultures, IResourceService} from '../contracts/all';
import {Descriptors, Validators} from '../utils/all';
import {Contact} from '../models/all';
import {ContactMock} from '../mocks/all';
import * as grid from './grid';

@Component({
    selector: 'ctoc-contacts',
    template: `
        <div class="grid-menu">
            <div class="btn-group">
                <button [title]="_resx ? _resx.tableMenu.save : ''" type="button" class="btn btn-default">
                    <span class="glyphicon glyphicon-floppy-save"></span>
                </button>
                <button [title]="_resx ? _resx.tableMenu.add : ''" type="button" class="btn btn-default">
                    <span class="glyphicon glyphicon-plus"></span>
                </button>
                <button [title]="_resx ? _resx.tableMenu.edit : ''" type="button" class="btn btn-default">
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
        <ctoc-grid 
            (selectedElement)="selectContact($event)"
            [gridColScheme]="_schemeColumns"
            [data]="_contacts"
            >
        </ctoc-grid>   
    `,
    directives: [grid.C2cGrid],
    styles: [`
        .grid-menu {
            margin-bottom: 15px;
        }
    `]
})
export class C2cContacts implements OnInit, OnDestroy {
    
    private _contacts: Contact[];
    private _schemeColumns: grid.C2cGridColumnsScheme;
    private _resx: any;
    private _langChangeSubscription: any;
    
    selectedElement: Contact;
    
    constructor(private _locator: ServiceLocator){}
    
    ngOnInit() {
        this.registerLangChanged();
        this._locator.getService<IResourceService>('IResourceService')
            .getResource()
            .subscribe(data => {
                this.updateCultureUI(data.controlPanel.contactsPan);
            });
        this._schemeColumns = this.getSchemeColumns();
        this._contacts = this.getContacts();
    }
    
    ngOnDestroy() {
        this._langChangeSubscription.unsubscribe();
    }
    
    get userService(): IUserService {
        return this._locator.getService<IUserService>('IUserService');
    }
    get eventService(): IEventService {
        return this._locator.getService<IEventService>('IEventService');
    }
    
    private registerLangChanged(){
        this._langChangeSubscription = this.eventService.subscribe(Descriptors.LanguageChange, (data) => {
            this.updateResource(data);
        });
    }
    
    updateCultureUI(resx: any){
        if (!resx) {
            this.eventService.emit({key: Descriptors.Exceptions, data: '[contact.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!'});
            return;
        }
        this._resx = resx; 
        this.updateGridResxByRef(this._schemeColumns);
    }
    
    updateResource(culture: Cultures){
        this._locator.getService<IResourceService>('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(data => {
                this.updateCultureUI(data.controlPanel.contactsPan);
            });
    }
    
    getContacts():Contact[] {
        return ContactMock.getContacts(7);
    }
    
    selectContact(el: any) {
        this.selectedElement = <Contact>el;
    }
    
    updateGridResxByRef(sc:grid.C2cGridColumnsScheme) {        
        sc.scheme.forEach((i) => {
            i.column.name = this._resx.table[i.column.id];
        });
    }
    
    removeContact() {
        if (!this.selectedElement)
            return;
        let tmp = this._contacts;
        let ind = tmp.findIndex((i) => i.id == this.selectedElement.id);
        this._contacts.splice(ind, 1);
    }
    
    getSchemeColumns():grid.C2cGridColumnsScheme {
        return new grid.C2cGridColumnsScheme([ {
                order: 0,
                column: new grid.C2cGridColumn('avatar', '', grid.C2cGridColumnType.pic)
            }, {
                order: 1,
                column: new grid.C2cGridColumn('familyName', '')
            }, {
                order: 2,
                column: new grid.C2cGridColumn('givenName', '')
            }, {
                order: 3,
                column: new grid.C2cGridColumn('middleName', '')
            }, {
                order: 4,
                column: new grid.C2cGridColumn('mail', '')
            }, {
                order: 5,
                column: new grid.C2cGridColumn('mobilePhone', '')
            }, {
                order: 6,
                column: new grid.C2cGridColumn('workPhone', '')
            }, {
                order: 7,
                column: new grid.C2cGridColumn('internalPhone', '')
            }, {
                order: 8,
                column: new grid.C2cGridColumn('position', '')
            }, {
                order: 9,
                column: new grid.C2cGridColumn('subdivision', '')
            }
        ]);
    }
}