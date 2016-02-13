import {Component, OnInit, OnDestroy, AfterViewInit} from 'angular2/core';
import {NgForm}    from 'angular2/common';

import {ServiceLocator} from '../services/all';
import {IUserInfo, IUserService, IEmitData, IEventService, Cultures, IResourceService} from '../contracts/all';
import {Descriptors, Validators} from '../utils/all';
import {ViewRegisterModel} from '../models/all'

@Component({
  selector: 'ctoc-register',
  templateUrl: 'app/view/ctoc-register.html'
})
export class C2cRegister implements OnInit, OnDestroy, AfterViewInit {
    btnSendTxt: string;
    loginFormCaption: string;
    emailLabelText: string;
    passLabelText: string;
    passConfirmLabelText: string;
    companyNameLabelText: string;    
    
    private _langChangeSubscription: any;
    private _winResizeSubscription: any;
    private _currentResx: any;
    
    private _model: ViewRegisterModel;
    private _validationError: string;
    
    private _registerSuccess: boolean = false;
    
    get model(): ViewRegisterModel {
        return this._model;
    }
    
    constructor(private _locator: ServiceLocator){ 
        this._model = new ViewRegisterModel();  
    }
    
    ngOnDestroy(){
        this._langChangeSubscription.unsubscribe();
        this._winResizeSubscription.unsubscribe();
    }
    
    ngAfterViewInit() {        
        //set event on resize
        this.registerResizeListening();
        //set event on lang changed
        this.registerLangChanged();
        this.showSpinner(false);
    }
    
    private registerResizeListening(){
        var t = document.getElementById('registerTable');
        t.style.height = (window.innerHeight - 70).toString() + 'px';
        this._winResizeSubscription = this.eventService.subscribe(Descriptors.WinResize, (data) => {
           t.style.height = data.height > 400 ? (data.height - data.height/3).toFixed(0).toString() + 'px' : '400px';
        });
    }
    
    private registerLangChanged(){
        this._langChangeSubscription = this.eventService.subscribe(Descriptors.LanguageChange, (data) => {
            this.updateResource(data);
        });
    }
    
    updateCultureUI(resx: any){
        if (!resx) {
            this.eventService.emit({key: Descriptors.Exceptions, data: '[register.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!'});
            return;
        }          
        this._currentResx = resx;  
        this.btnSendTxt = resx.btnSend;
        this.loginFormCaption = resx.captionForm;
        this.emailLabelText = resx.emailLabelText;
        this.passLabelText = resx.passLabelText;
        this.passConfirmLabelText = resx.passConfirmLabelText;
        this.companyNameLabelText = resx.companyNameLabelText;
        
        if (this._isModelValided)
            this.modelValid(this.model);
    }
    
    updateResource(culture: Cultures){
        this._locator.getService<IResourceService>('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(data => {
                this.updateCultureUI(data.registerPage);
            });
    }
    
    ngOnInit(){        
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
    
    private _isModelValided = false;
    modelValid(m: ViewRegisterModel): boolean{
        this._isModelValided = true;
        if (!m.email ||
            !m.companyName ||
            !m.password || 
            !m.confirmPassword)
            return false;
        if (!this.validateEmail(m.email)) {
            this._validationError = this._currentResx.errors.invalidEmail;
            return false;
        } else if (!this.validateCompany(m.companyName)) {
            this._validationError = this._currentResx.errors.companyIsAlreadyExist
            return false;
        } else if (!this.validatePassword(m.password)) {
            this._validationError = this._currentResx.errors.passwordTooLess
            return false;
        } else if (!this.validatePasswordSame(m.password, m.confirmPassword)) {
            this._validationError = this._currentResx.errors.confirmPasswordError
            return false;
        }
        this._validationError = '';
        return true;
    }
    
    validateEmail(email): boolean {
        return Validators.emailValidate(email);
    }
    
    validateCompany(companyName: string): boolean {
        //todo: searchin server companies with same name
        return true;
    }
    
    validatePassword(pass: string): boolean {
        return Validators.passwordValidate(pass);
    }
    
    validatePasswordSame(pass1: string, pass2: string){
        return pass1 == pass2;
    }
    
    private _isSending = false;
    send() {
        if (!this.modelValid(this.model))
            return;        
        
        let tmp = this.btnSendTxt;
        if (!this._isSending) {
            this._isSending = true;
            this.btnSendTxt = '';
            this.showSpinner();
            this.userService.register(this.model).subscribe((res) => {
                this.showSpinner(false);
                this.btnSendTxt = tmp;
                this._isSending = false;
                if (!res.result)
                    this._validationError = res.reason;
                else {
                    this._registerSuccess = true;
                }
            });
        }
        
    }
    
    showSpinner(show: boolean = true){        
        let spin = document.getElementById('spinBtnRegister');
        spin.innerHTML = !show ? '' : '<i class="fa fa fa-spinner fa-spin"></i>';     
    }
}