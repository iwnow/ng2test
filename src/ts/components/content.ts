import {Component, OnInit, Input, Output} from 'angular2/core';

import * as Menu from '../utils/menu';
import * as Services from '../services/all';
import * as Contracts from '../contracts/all';

@Component({
    selector: 'ctoc-content',
    templateUrl: 'app/view/ctoc-content.html',
    inputs: ['contentHeader', 'sidebarSelectedMenuItem']
})
export class C2cContent implements OnInit {
    @Input() sidebarSelectedMenuItem: Menu.MenuItem;
    @Input() contentHeader: string;
    
    ngOnInit(){}
    constructor(private _locator: Services.ServiceLocator){}
    
    get user(): Contracts.IUserInfo {
        return this.userService.getUserInfo();
    }
    
    get userService(): Contracts.IUserService {
        return this._locator.getService<Contracts.IUserService>('IUserService');
    }
}