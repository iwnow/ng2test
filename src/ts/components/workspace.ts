//--external modules
import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';
//--app modules
import {ServiceLocator} from '../services/locator.service';
import {IUserService} from '../contracts/iservices';
import {IUserInfo} from '../contracts/iuserinfo';
import {C2cSidebar} from './sidebar';
import {C2cContent} from './content';
import * as Menu from '../utils/menu';


@Component({
    selector: 'ctoc-workspace',
    inputs: ['workspacePanName','workspaceMenu'],
    directives: [C2cSidebar, C2cContent],
    template: `
    <div *ngIf="isActiveWorkspacePan('controlPan')" class="row">
        <ctoc-sidebar [menu]="workspaceMenu" (selectedPage)="selectMenuItem($event)"></ctoc-sidebar>
        <ctoc-content
            [sidebarSelectedMenuItem]="sidebarSelectedMenuItem"
            [contentHeader]="sidebarSelectedMenuItem.TextItem"
            (dataChanged)="childWindowDataChanged($event)"
            >
        </ctoc-content>
    </div>
    <div *ngIf="isActiveWorkspacePan('profilePan')" class="row">
            <ctoc-sidebar [menu]="workspaceMenu" (selectedPage)="selectMenuItem($event)"></ctoc-sidebar>
            <ctoc-content 
                [sidebarSelectedMenuItem]="sidebarSelectedMenuItem"
                [contentHeader]="sidebarSelectedMenuItem.TextItem">
            </ctoc-content>
    </div>
    `
})
export class C2cWorkspace implements OnInit {
    @Output() dataChanged = new EventEmitter<boolean>();
    
    currentUser: IUserInfo;    
    workspaceMenu: Menu.SidebarMenu; //menu navigation bar on left
    workspacePanName: string // panel bottom on header
    sidebarSelectedMenuItem: Menu.MenuItem; //selected menu item in sidebar
    
    private _childWinDataChanged = false;
    childWindowDataChanged(changed: boolean) {
        this._childWinDataChanged = changed;
        this.dataChanged.emit(changed);
        this.workspaceMenu.outerDataChanged = changed;
    }
    
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