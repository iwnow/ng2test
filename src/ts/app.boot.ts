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
    providers: [EventService,ExceptionService,ResourceService, ServiceLocator,UserService,
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
    ddMenuCntrlPan: string;
    ddMenuProfilePan: string;
    ddMenuLogOutBtn: string;
    //fix with resources
    profileMenu: Menu.SidebarMenu = new Menu.SidebarMenu([
            new Menu.MenuItem('profile', ''),
            new Menu.MenuItem('password', '')
        ]);
    controlMenu: Menu.SidebarMenu = new Menu.SidebarMenu([
            new Menu.MenuItem('contacts', ''),
            new Menu.MenuItem('pay', '')
        ]);
    
    static IsExceptionRised: boolean = false;
    
    private loginMenu:{dropped:boolean} = {dropped: false};
    private langMenu:{dropped:boolean} = {dropped: false};
    
    constructor(private _eventService: EventService,
                private _usrService: UserService,
                private _srvLocator: ServiceLocator,
                private _exceptionService:ExceptionService){        
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
        this.loginLink = resx.navBar.login;
        this.registerLink = resx.navBar.register;
        this.ddMenuCntrlPan = resx.navBar.dropDownNavMenu.controlPanel;
        this.ddMenuProfilePan = resx.navBar.dropDownNavMenu.profilePanel;
        this.ddMenuLogOutBtn = resx.navBar.dropDownNavMenu.logOutBtn;
        //menu item in sidebar
        this.profileMenu.Items[this.profileMenu.Items.findIndex((i) => i.Id == 'profile')].TextItem = resx.profilePanel.sideBarMenu.profile;
        this.profileMenu.Items[this.profileMenu.Items.findIndex((i) => i.Id == 'password')].TextItem = resx.profilePanel.sideBarMenu.passwordManage;
        this.controlMenu.Items[this.controlMenu.Items.findIndex((i) => i.Id == 'contacts')].TextItem = resx.controlPanel.sideBarMenu.contacts;
        this.controlMenu.Items[this.controlMenu.Items.findIndex((i) => i.Id == 'pay')].TextItem = resx.controlPanel.sideBarMenu.payment;
    }
    
    updateResource(culture: Cultures){
        this._srvLocator.getService<IResourceService>('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(data => {
                this.updateCultureUI(data);
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
        //timeout - mousedown rise before var in template changed
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
        this.loginMenu.dropped = false;
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
    
    
    langChoose(lang: string){
        this.langMenu.dropped = false;
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


