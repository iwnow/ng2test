import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';

import * as Utils from '../utils/all';
import * as Services from '../services/all';
import * as Contracts from '../contracts/all';
import {C2cProfile} from './profile';
import {C2cEditPass} from './editpass';
import {C2cContacts} from './contacts';

@Component({
    selector: 'ctoc-content',
    inputs: ['contentHeader', 'sidebarSelectedMenuItem'],
    directives: [C2cProfile, C2cEditPass, C2cContacts],
    template: `
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <h3 class="page-header">{{company}}&nbsp;/&nbsp;{{contentHeader}}</h3>
            <ctoc-profile *ngIf="menuId == 'profile'"></ctoc-profile>
            <ctoc-edit-pass *ngIf="menuId == 'password'"></ctoc-edit-pass>
            <ctoc-contacts  *ngIf="menuId == 'contacts'"
                (dataChanged)="childWindowDataChanged($event)"
            ></ctoc-contacts>
        </div>
    `
})
export class C2cContent implements OnInit {
    @Output() dataChanged = new EventEmitter<boolean>();
    @Input() sidebarSelectedMenuItem: Utils.MenuItem;
    @Input() contentHeader: string;
    
    ngOnInit(){}
    constructor(private _locator: Services.ServiceLocator){}
    
    private _childWinDataChanged = false;
    childWindowDataChanged(changed: boolean) {
        this._childWinDataChanged = changed;
        this.dataChanged.emit(changed);
    }
    
    get user(): Contracts.IUserInfo {
        return this.userService.getUserInfo();
    }
    
    get company(): string {
        return this.user.companies.length > 0 ? this.user.companies[0].name : '';
    }
    
    get userService(): Contracts.IUserService {
        return this._locator.getService<Contracts.IUserService>('IUserService');
    }
    
    get menuId(): string {
        return this.sidebarSelectedMenuItem ? this.sidebarSelectedMenuItem.Id : '';
    }
}