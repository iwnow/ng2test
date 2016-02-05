import {Component, OnInit} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {C2cMenu, C2cMenuItem} from './components/menu';
import {ServiceLocator} from './services/locator.service';
import {IUserInfoService} from './contracts/iservices';
import {IUserInfo} from './contracts/iuserinfo';

@Component({
    selector: 'ctoc-app',
    templateUrl: 'app/view/ctoc.html',
    directives: [C2cMenu],
    providers: [ServiceLocator]
})
class CtocApp implements OnInit{    
    projectName: string;
    toggleNav: boolean;
    
    constructor(private _srvLocator: ServiceLocator){        
        this.projectName = "C2C";
        this.toggleNav = false;        
        window.addEventListener('resize', () => { this.docWidth = window.innerWidth; });  
            
    }
       
    ngOnInit(){
        this.screenLoadingOff();
    }
    
    get currentUser(): IUserInfo {
        return  this.userInfoService.getUserInfo();
    }
    
    /** Сервис для получения информации о текущем пользователе */
    get userInfoService(): IUserInfoService {
        return <IUserInfoService>this._srvLocator.getService('IUserInfoService');
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
}

bootstrap(CtocApp);


