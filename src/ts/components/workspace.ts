import {Component, OnInit, Input} from 'angular2/core';

import {ServiceLocator} from '../services/locator.service';
import {IUserService} from '../contracts/iservices';
import {IUserInfo} from '../contracts/iuserinfo';

@Component({
    selector: 'ctoc-workspace',
    templateUrl: 'app/view/ctoc-workspace.html',
    inputs: ['workspacePanName']
})
export class C2cWorkspace implements OnInit {
    
    //@Input() menuItems: C2cMenuItem[];
    currentUser: IUserInfo;
    workspacePanName: string;
    
    ngOnInit(){ }
    
    constructor(private _srvLocator: ServiceLocator) {
        this.currentUser = _srvLocator.getService<IUserService>('IUserService').getUserInfo();
    }
}