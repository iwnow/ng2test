import {Component, OnInit} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {C2cWorkspace} from './components/workspace';
import {ServiceLocator} from './services/locator.service';
import {IUserService} from './contracts/iservices';
import {IUserInfo} from './contracts/iuserinfo';

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
    
    constructor(private _srvLocator: ServiceLocator){        
        this.projectName = "C2C";
        this.toggleNav = false;        
        window.addEventListener('resize', () => { this.docWidth = window.innerWidth; });  
        this.selectedWorkspace = 'no';    
    }
       
    ngOnInit(){
        this.screenLoadingOff();
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
        console.log(wrkSpace);
    }
}

bootstrap(CtocApp).catch(err => {
    document.body.removeChild(document.getElementsByTagName('ctoc-app')[0]);
    document.getElementById('startScreen').childNodes[0].textContent = ':( oops ' + err;
});;


