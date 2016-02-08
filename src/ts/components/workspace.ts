//--external modules
import {Component, OnInit, Input} from 'angular2/core';
//--app modules
import {ServiceLocator} from '../services/locator.service';
import {IUserService} from '../contracts/iservices';
import {IUserInfo} from '../contracts/iuserinfo';
import {C2cSidebar} from './sidebar';
import {C2cContent} from './content';
import * as Menu from '../utils/menu';


@Component({
    selector: 'ctoc-workspace',
    templateUrl: 'app/view/ctoc-workspace.html',
    inputs: ['workspacePanName','workspaceMenu'],
    directives: [C2cSidebar, C2cContent]
})
export class C2cWorkspace implements OnInit {
    
    currentUser: IUserInfo;    
    workspaceMenu: Menu.SidebarMenu; //menu navigation bar on left
    workspacePanName: string // panel bottom on header
    sidebarSelectedMenuItem: Menu.MenuItem; //selected menu item in sidebar
    
    
    ngOnInit(){       
        if (!this.sidebarSelectedMenuItem)
            this.selectMenuItem(this.workspaceMenu.Items[0]);  
    }
    
    constructor(private _srvLocator: ServiceLocator) {
        this.currentUser = _srvLocator.getService<IUserService>('IUserService').getUserInfo();        
    }   
    
    /**
     * Проверяет является ли страница активной в данный момент
     */
    isActiveWorkspacePan(panName: string){
        return this.workspacePanName == panName;
    }
    
    //from sidebar
    selectMenuItem(selMenuItem:Menu.MenuItem){
        if (this.sidebarSelectedMenuItem === selMenuItem)
            return;
        this.sidebarSelectedMenuItem = selMenuItem;
    }
}

//todo: fix with enum for select!
export enum WorkspacesName {
    Profile = 0,
    ControlPanel = 1
}