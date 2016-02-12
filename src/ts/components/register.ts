import {Component, OnInit} from 'angular2/core';
import {NgForm}    from 'angular2/common';

import {ServiceLocator} from '../services/all';
import {IUserInfo, IUserService, IEmitData, IEventService, Cultures, IResourceService} from '../contracts/all';
import {Descriptors} from '../utils/all';

@Component({
  selector: 'ctoc-register',
  templateUrl: 'app/view/ctoc-register.html'
})
export class C2cRegister implements OnInit {
    btnSendTxt: string;
    loginFormCaption: string;
    emailLabelText: string;
    passLabelText: string;
    passConfirmLabelText: string;
    companyNameLabelText: string;
    
    
    constructor(private _locator: ServiceLocator){
        this._model = this.userService.getUserInfo();      
        //set event on resize
        this.registerResizeListening();
        //set event on lang changed
        this.registerLangChanged();
    }
    
    private registerResizeListening(){
        var t = document.getElementById('registerTable');
        t.style.height = (window.innerHeight - 70).toString() + 'px';
        this.eventService.subscribe(Descriptors.WinResize, (data) => {
           t.style.height = data.height > 400 ? (data.height - data.height/3).toFixed(0).toString() + 'px' : '400px';
        });
    }
    
    private registerLangChanged(){
        this.eventService.subscribe(Descriptors.LanguageChange, (data) => {
            this.updateResource(data);
        });
    }
    
    updateCultureUI(resx: any){
        if (!resx) {
            this.eventService.emit({key: Descriptors.Exceptions, data: '[register.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!'});
            return;
        }            
        this.btnSendTxt = resx.btnSend;
        this.loginFormCaption = resx.captionForm;
        this.emailLabelText = resx.emailLabelText;
        this.passLabelText = resx.passLabelText;
        this.passConfirmLabelText = resx.passConfirmLabelText;
        this.companyNameLabelText = resx.companyNameLabelText;
    }
    
    updateResource(culture: Cultures){
        this._locator.getService<IResourceService>('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(data => {
                this.updateCultureUI(data.registerPage);
            });
    }
    
    ngOnInit(){      
        this.showSpinner(false);
        this._locator.getService<IResourceService>('IResourceService')
            .getResource()
            .subscribe(data => {
                this.updateCultureUI(data.registerPage);
            });
    }
    
    get userService(): IUserService {
        return this._locator.getService<IUserService>('IUserService');
    }
    get eventService(): IEventService {
        return this._locator.getService<IEventService>('IEventService');
    }
    
    private _model: IUserInfo;
    get model():IUserInfo { return this._model;}
    set model(val: IUserInfo){
        this._model = val;
    }
    
    private _isSending = false;
    send() {
        let tmp = this.btnSendTxt;
        if (!this._isSending) {
            this._isSending = true;
            this.btnSendTxt = '';
            this.showSpinner();
            setTimeout(() => {
                this.showSpinner(false);
                this.btnSendTxt = tmp;
                this._isSending = false;
            }, 3000);
        }
        
    }
    
    showSpinner(show: boolean = true){        
        let spin = document.getElementById('spinBtnRegister');
        spin.innerHTML = !show ? '' : '<i class="fa fa fa-spinner fa-spin"></i>';     
    }
}