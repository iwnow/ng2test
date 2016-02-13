import {Component, OnInit} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/Rx';

import {C2cWorkspace,C2cLogin, C2cRegister} from './components/all';
import {ServiceLocator, ResourceService, EventService, UserService,ExceptionService} from './services/all';
import {IUserService, IUserInfo, 
        IEmitData,IEventService,
        Cultures, IResourceService} from './contracts/all';
import * as Menu from './utils/menu';
import * as Utils from './utils/all';


@Component({
    selector: 'ctoc-app',
    templateUrl: 'app/view/ctoc.html',
    directives: [C2cWorkspace, C2cLogin, C2cRegister],
    providers: [ResourceService, ServiceLocator,EventService,UserService,ExceptionService,
                HTTP_PROVIDERS]
})
class CtocApp implements OnInit{    
    projectName: string;
    toggleNav: boolean;
    selectedWorkspace: string;
    selectedWorkspaceMenu: Menu.SidebarMenu;
    languages: string[];
    selectedLang: string;
    loginOrReg = true;
    //ui vars
    loginLink: string;
    registerLink: string;
    
    static IsExceptionRised: boolean = false;
    
    constructor(private _srvLocator: ServiceLocator, private _exceptionService:ExceptionService){        
        this.projectName = "C2C";
        this.toggleNav = false;        
        this.addResizeEvent();
        this.registerLangChanged();
        this.profileMenu.Items[0].IsActive = true;   
        this.addLangs();
    }
    
    addResizeEvent() {
        window.addEventListener('resize', () => { 
            this.docWidth = window.innerWidth;
            this.eventService.emit({
                key:Utils.Descriptors.WinResize, 
                data: {
                    width: this.docWidth,
                    height: window.innerHeight
                },
                who: 'resize app boot'
            });
        });  
    }
    
    private registerLangChanged(){
        this.eventService.subscribe(Utils.Descriptors.LanguageChange, (data) => {
            this.updateResource(data);
        });
    }
    
    updateCultureUI(resx: any){
        if (!resx) {
            this.eventService.emit({key: Utils.Descriptors.Exceptions, data: '[app.boot.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!'});
            return;
        }
        this.loginLink = resx.login;
        this.registerLink = resx.register;
    }
    
    updateResource(culture: Cultures){
        this._srvLocator.getService<IResourceService>('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(data => {
                this.updateCultureUI(data.navBar);
            });
    }
    
    addLangs() {
        this.languages = this.resxService.supportedCultures().map((e) => this.resxService.getNameByEnum(e));
        this.langChoose('Ru');
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
    /** Сервис работы с ресурсами приложения */
    get resxService(): IResourceService {
        return this._srvLocator.getService<IResourceService>('IResourceService');
    }
    /** Сервис асинхронных сообщений */
    get eventService(): IEventService {
        return this._srvLocator.getService<IEventService>('IEventService');
    }
    
    logOut(){
        setTimeout(() => {
            this.userService.logOut();
        }, 0);        
    }
    
    /** отключение экрана загрузки */
    screenLoadingOff(){
        if (!CtocApp.IsExceptionRised) {
            document.getElementById('startScreen').style.display = 'none';        
            document.getElementsByTagName('html')[0].classList.remove('startBody');
            document.body.classList.remove('startBody');
        }
    }
    
    // UI панель навигации    
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
    
    /**Выбор текущего воркспейса */
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
    
    langChoose(lang: string){
        if (this.selectedLang == lang)
            return;
        this.selectedLang = lang;
        let culture = this.resxService.getCultureByName(lang);
        this.resxService.setResource(culture);
        this.eventService.emit({
           key: Utils.Descriptors.LanguageChange,
           data: culture
        });        
    }
}

bootstrap(CtocApp).catch(err => {
    CtocApp.IsExceptionRised = true;
    document.getElementById('startScreen').style.display = 'table';
    document.body.removeChild(document.getElementsByTagName('ctoc-app')[0]);
    document.getElementById('startScreen').childNodes[0].textContent = err;
});


