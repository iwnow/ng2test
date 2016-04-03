import {Component, OnInit, OnDestroy} from 'angular2/core';
import {NgForm}    from 'angular2/common';

import {ServiceLocator} from '../services/all';
import {IUserInfo, IUserService, IEmitData, IEventService, Cultures, IResourceService} from '../contracts/all';
import {Descriptors, Validators} from '../utils/all';
import {ViewLoginModel} from '../models/all';

@Component({
  selector: 'ctoc-login',
  template:`
<table id="loginTable" style="width: 100%;">
<tr>
    <td style="width: auto;"></td>
    <td style="width: 350px;">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title text-center">{{loginFormCaption}}</h3>
            </div>
            <div class="panel-body">
                <form>       
                                 
                    <div class="input-group">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></span>
                        <input type="email" class="form-control" 
                                [(ngModel)]="_model.email"
                                [placeholder]="emailLabelText" required>
                    </div>                 
                    <div class="input-group">
                        <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                        <input type="password" class="form-control"
                                [(ngModel)]="_model.password" 
                                [placeholder]="passLabelText" required>
                    </div>                  
                
                    <button (click)="send()" type="submit"
                            class="btn-success btn form-control" 
                            style="width: 320px; max-width: 400px;">
                            <span id="spinBtnLogin"><i class="fa fa fa-spinner fa-spin"></i></span>
                            {{btnSendTxt}}
                    </button>
                    
                </form>
            </div>
        </div>
        <div class="text-danger" id="validate-text-error">
            {{_validationError}}
        </div>
    </td>
    <td style="width: auto;"></td>
</tr>
</table>

  `
})
export class C2cLogin implements OnInit, OnDestroy {
    btnSendTxt: string;
    loginFormCaption: string;
    emailLabelText: string;
    passLabelText: string;
    
    private _langChangeSubscription: any;
    private _winResizeSubscription: any;
    
    private _model: ViewLoginModel;
    private _validationError: string;
    private _resx: any;
    
    get model(): ViewLoginModel {
        return this._model;
    }
    
    constructor(private _locator: ServiceLocator){
        this._model = new ViewLoginModel();      
        //set event on resize
        this.registerResizeListening();
        //set event on lang changed
        this.registerLangChanged();
    }
    
    private registerResizeListening(){
        var t = document.getElementById('loginTable');
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
            this.eventService.emit({key: Descriptors.Exceptions, data: '[login.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!'});
            return;
        }
        this._resx = resx; 
        this.btnSendTxt = resx.btnSend;
        this.loginFormCaption = resx.captionForm;
        this.emailLabelText = resx.emailLabelText;
        this.passLabelText = resx.passLabelText;
    }
    
    updateResource(culture: Cultures){
        this._locator.getService<IResourceService>('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(data => {
                this.updateCultureUI(data.loginPage);
            });
    }
    
    ngOnInit(){      
        this.showSpinner(false);
        this._locator.getService<IResourceService>('IResourceService')
            .getResource()
            .subscribe(data => {
                this.updateCultureUI(data.loginPage);
            });
    }
    
    ngOnDestroy(){
        this._langChangeSubscription.unsubscribe();
        this._winResizeSubscription.unsubscribe();
    }
    
    get userService(): IUserService {
        return this._locator.getService<IUserService>('IUserService');
    }
    get eventService(): IEventService {
        return this._locator.getService<IEventService>('IEventService');
    }
    
    validateModel(model: ViewLoginModel): boolean {
        if (!model.email || !model.password)
            return false;
        if (!Validators.emailValidate(model.email)) {
            this._validationError = this._resx.errors.invalidEmail;
            return false;
        }
        this._validationError = '';
        return true;
    }
    
    private _isSending = false;
    send() {
        if (!this.validateModel(this.model))
            return;
        
        let finishLogin = () => {
            this.showSpinner(false);
            this.btnSendTxt = tmp;
            this._isSending = false;
        };
        
        let tmp = this.btnSendTxt;
        if (!this._isSending) {
            this._isSending = true;
            this.btnSendTxt = '';
            this.showSpinner();
            this.userService
                .logIn(this.model)
                .subscribe((res) => {
                    if (!res.result)
                        this._validationError = res.reason;
                    this.eventService.emit({
                        data: res,
                        key: Descriptors.Logger
                    });
                    finishLogin();
                }, err => {
                    this.eventService.emit({
                       data: (<any>err).status,
                       key: Descriptors.Exceptions 
                    });
                    finishLogin();
                });
        }
        
    }
    
    showSpinner(show: boolean = true){        
        let spin = document.getElementById('spinBtnLogin');
        spin.innerHTML = !show ? '' : '<i class="fa fa fa-spinner fa-spin"></i>';     
    }
}