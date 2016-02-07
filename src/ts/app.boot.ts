import {Component, OnInit} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {C2cWorkspace} from './components/workspace';
import {ServiceLocator} from './services/locator.service';
import {IUserService} from './contracts/iservices';
import {IUserInfo} from './contracts/iuserinfo';
import * as Menu from './utils/menu';

@Component({
    selector: 'ctoc-app',
    templateUrl: 'app/view/ctoc.html',
    directives: [C2cWorkspace],
    providers: [ServiceLocator]
})
class CtocApp implements OnInit{    
    projectName: string;
    toggleNav: boolean;
    selectedWorkspace: string;
    selectedWorkspaceMenu: Menu.SidebarMenu;
    
    constructor(private _srvLocator: ServiceLocator){        
        this.projectName = "C2C";
        this.toggleNav = false;        
        window.addEventListener('resize', () => { this.docWidth = window.innerWidth; });  
        this.profileMenu.Items[0].IsActive = true;   
    }
       
    ngOnInit(){
        this.screenLoadingOff();
        this.selectWorkspace('controlPan');
    }
    
    get currentUser(): IUserInfo {
        return  this.userService.getUserInfo();
    }
    
    /** Сервис для получения информации о текущем пользователе */
    get userService(): IUserService {
        return this._srvLocator.getService<IUserService>('IUserService');
    }
    
    /** отключение экрана загрузки */
    screenLoadingOff(){
        document.getElementById('startScreen').style.display = 'none';
        document.getElementsByTagName('html')[0].classList.remove('startBody');
        document.body.classList.remove('startBody');
    }
    
    // панель навигации    
    get navClass(): string {
        return this.toggleNav ? '' : 'navbar-collapse collapse';
    }   
    
    navToggle() {
        this.toggleNav = !this.toggleNav;
    }
    
    private _docWidth: number;
    private get docWidth(): number {
        return this._docWidth;
    }
    private set docWidth(val:number) {
        this._docWidth = val;
        this.toggleNav = false;        
    }
    //
    
    selectWorkspace(wrkSpace: string) {
        //ev.preventDefault();
        this.selectedWorkspace = wrkSpace;
        switch (wrkSpace) {
            case 'controlPan':
                this.selectedWorkspaceMenu = this.controlMenu;
                break;
            case 'profilePan':
                this.selectedWorkspaceMenu = this.profileMenu;
                break;
            default:
                break;
        }
    }
    
    
    //fix with resources
    profileMenu: Menu.SidebarMenu = new Menu.SidebarMenu([
        new Menu.MenuItem('profile', 'Profile'),
        new Menu.MenuItem('password', 'Change Password')
    ]);
    controlMenu: Menu.SidebarMenu = new Menu.SidebarMenu([
        new Menu.MenuItem('contacts', 'Contacts'),
        new Menu.MenuItem('pay', 'Payment Info')
    ]);
    
    
}

bootstrap(CtocApp).catch(err => {
    document.body.removeChild(document.getElementsByTagName('ctoc-app')[0]);
    document.getElementById('startScreen').childNodes[0].textContent = ':( oops ' + err;
});;


