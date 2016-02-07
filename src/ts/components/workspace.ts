//--external modules
import {Component, OnInit, Input} from 'angular2/core';
//--app modules
import {ServiceLocator} from '../services/locator.service';
import {IUserService} from '../contracts/iservices';
import {IUserInfo} from '../contracts/iuserinfo';
import {C2cSidebar} from './sidebar';
import * as Menu from '../utils/menu';


@Component({
    selector: 'ctoc-workspace',
    templateUrl: 'app/view/ctoc-workspace.html',
    inputs: ['workspacePanName','workspaceMenu'],
    directives: [C2cSidebar]
})
export class C2cWorkspace implements OnInit {
    
    currentUser: IUserInfo;    
    workspaceMenu: Menu.SidebarMenu; //menu navigation bar on left
    workspacePanName: string // panel bottom on header
    workspacePageName: string; //right on sidebar space
    
    
    ngOnInit(){         
    }
    
    constructor(private _srvLocator: ServiceLocator) {
        this.currentUser = _srvLocator.getService<IUserService>('IUserService').getUserInfo();
        
    }   
    
    
    //from sidebar
    selectPage(pageId:string){
        if (this.workspacePageName == pageId)
            return;
        this.workspacePageName = pageId;
        console.log(pageId);
    }
}

//todo: fix with enum for select!
export enum WorkspacesName {
    Profile = 0,
    ControlPanel = 1
}