import {Component, OnInit, OnDestroy} from 'angular2/core';
import {NgForm}    from 'angular2/common';

import {ServiceLocator} from '../services/all';
import {IUserInfo, IUserService, IEmitData, IEventService, Cultures, IResourceService} from '../contracts/all';
import {Descriptors, Validators} from '../utils/all';
import {ViewLoginModel} from '../models/all';

@Component({
  selector: 'ctoc-profile',
  templateUrl: 'app/view/ctoc-profile.html'
})
export class C2cProfile implements OnInit, OnDestroy {
    
    private _langChangeSubscription: any;
    private _winResizeSubscription: any;
    
    private _resx: any;
    private _companyLabel: string;
    private _emailLabel: string;
    private _registerDateLabel: string;
    private _phoneNumberLabel: string;
    
    
    constructor(private _locator: ServiceLocator){
        //set event on resize
        //this.registerResizeListening();
        //set event on lang changed
        this.registerLangChanged();
    }
    
    private registerResizeListening(){
        // var t = document.getElementById('loginTable');
        // t.style.height = (window.innerHeight - 70).toString() + 'px';
        // this._winResizeSubscription = this.eventService.subscribe(Descriptors.WinResize, (data) => {
        //    t.style.height = data.height > 400 ? (data.height - data.height/3).toFixed(0).toString() + 'px' : '400px';
        // });
    }
    
    private registerLangChanged(){
        this._langChangeSubscription = this.eventService.subscribe(Descriptors.LanguageChange, (data) => {
            this.updateResource(data);
        });
    }
    
    updateCultureUI(resx: any){
        if (!resx) {
            this.eventService.emit({key: Descriptors.Exceptions, data: '[login.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!'});
            return;
        }
        this._resx = resx; 
        this._companyLabel = resx.profileContent.companyLabel;
        this._emailLabel = resx.profileContent.emailLabel;
        this._phoneNumberLabel = resx.profileContent.phoneNumberLabel;
        this._registerDateLabel = resx.profileContent.registerDateLabel;
    }
    
    updateResource(culture: Cultures){
        this._locator.getService<IResourceService>('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(data => {
                this.updateCultureUI(data.profilePanel);
            });
    }
    
    ngOnInit(){      
        this._locator.getService<IResourceService>('IResourceService')
            .getResource()
            .subscribe(data => {
                this.updateCultureUI(data.profilePanel);
            });
    }
    
    ngOnDestroy(){
        this._langChangeSubscription.unsubscribe();
        //this._winResizeSubscription.unsubscribe();
    }
    
    get userService(): IUserService {
        return this._locator.getService<IUserService>('IUserService');
    }
    get eventService(): IEventService {
        return this._locator.getService<IEventService>('IEventService');
    }
    get resxService(): IResourceService {
        return this._locator.getService<IResourceService>('IResourceService');
    }
    
    get company(): string {
        let cs = this.userService.getUserInfo().companies;
        return cs.length > 0 ? cs[0].name : '';
    }
    
    get registerDate(): string {
        let cs = this.userService.getUserInfo().companies;
        let locale = this.resxService.getCurrentCulture();
        return cs.length > 0 ? cs[0].registerDate.toLocaleDateString(locale) : '';
    }
    
    get mobilePhone(): string {
        return this.userService.getUserInfo().mobilePhone;
    }
    
    get login(): string {
        return this.userService.getUserInfo().email;
    }
    
}