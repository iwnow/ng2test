import {Component, OnInit, Input, Output} from 'angular2/core';

import * as Utils from '../utils/all';
import * as Services from '../services/all';
import * as Contracts from '../contracts/all';
import {C2cProfile} from './profile';
import {C2cEditPass} from './editpass';
import {C2cContacts} from './contacts';

@Component({
    selector: 'ctoc-content',
    templateUrl: 'app/view/ctoc-content.html',
    inputs: ['contentHeader', 'sidebarSelectedMenuItem'],
    directives: [C2cProfile, C2cEditPass, C2cContacts]
})
export class C2cContent implements OnInit {
    @Input() sidebarSelectedMenuItem: Utils.MenuItem;
    @Input() contentHeader: string;
    
    ngOnInit(){}
    constructor(private _locator: Services.ServiceLocator){}
    
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