import {Component, OnInit, OnDestroy} from 'angular2/core';
import {NgForm}    from 'angular2/common';

import {ServiceLocator} from '../services/all';
import {IUserInfo, IUserService, IEmitData, IEventService, Cultures, IResourceService} from '../contracts/all';
import {Descriptors, Validators} from '../utils/all';
import {ViewChangePassword} from '../models/all';

//test
import {C2cModalInfo} from './modal'

@Component({
  selector: 'ctoc-edit-pass',
  directives: [C2cModalInfo],
  template: `
  <div class="row">
    <div class="col-md-6 col-lg-6 well" align="center" style="max-width:400px;"> 
        <form>       
                                        
            <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <input type="password" class="form-control" 
                        [(ngModel)]="_model.oldPassword"
                        [placeholder]="oldPasswordLabel" required>
            </div>                 
            <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <input type="password" class="form-control"
                        [(ngModel)]="_model.newPassword" 
                        [placeholder]="newPasswordLabel" required>
            </div>                  
            <div class="input-group">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <input type="password" class="form-control"
                        [(ngModel)]="_model.confirmNewPassword" 
                        [placeholder]="confirmNewPasswordLabel" required>
            </div> 
            <button (click)="send()" type="submit"
                    class="btn-primary btn form-control" 
                    style="width: 100%; max-width: 10000px;">
                    <span id="spinBtnPassChange"><i class="fa fa fa-spinner fa-spin"></i></span>
                    {{btnSendTxt}}
            </button>
            
        </form>
    </div>
    <div class=" col-md-6 col-lg-6 "> 
    </div>    
</div>
<ctoc-modal-info *ngIf="modalShow"
            [title]="modalTitle"
            [msg]="modalMsg"
            (close)="modalShow=false" 
            (ok)="modalShow=false">
</ctoc-modal-info>
  `
})
export class C2cEditPass implements OnInit, OnDestroy {
    
    private _langChangeSubscription: any;
    private _winResizeSubscription: any;
    
    private _resx: any;
    private _model: ViewChangePassword = new ViewChangePassword();
    get model():ViewChangePassword {
        return this._model;
    }
    
    private btnSendTxt: string;
    private oldPasswordLabel: string;
    private newPasswordLabel: string;
    private confirmNewPasswordLabel: string;
    
    modalShow: boolean = false;
    modalTitle: string = 'Password change';
    modalMsg: string = 'Пароль успешно изменен';
    
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
        this.oldPasswordLabel = resx.oldPasswordLabel;
        this.newPasswordLabel = resx.newPasswordLabel;
        this.confirmNewPasswordLabel = resx.confirmNewPasswordLabel;
        this.btnSendTxt = resx.btnSend;
    }
    
    updateResource(culture: Cultures){
        this._locator.getService<IResourceService>('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(data => {
                this.updateCultureUI(data.profilePanel.passwordContent);
            });
    }
    
    ngOnInit(){    
        this.showSpinner(false);  
        this._locator.getService<IResourceService>('IResourceService')
            .getResource()
            .subscribe(data => {
                this.updateCultureUI(data.profilePanel.passwordContent);
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
    
    validateModel(model: ViewChangePassword): boolean {
        if(!this.model.oldPassword ||
            !this.model.newPassword ||
            !this.model.confirmNewPassword)
            return;
        
        return true;
    }
    
    private _isSending = false;
    send() {
        if (!this.validateModel(this.model))
            return;
        
        let tmp = this.btnSendTxt;
        if (!this._isSending) {
            this._isSending = true;
            this.btnSendTxt = '';
            this.showSpinner();
            let sub = this.userService
                .changePassword(this._model)
                .subscribe((res) => {
                    this.showSpinner(false);
                    this.btnSendTxt = tmp;
                    this._isSending = false;
                    if (res.result)    
                        console.log('pass changed'); 
                    else console.log(`error handle: ${res.reason}`);   
                    sub.unsubscribe();                      
                });
        }
        
    }
    
    showSpinner(show: boolean = true){        
        let spin = document.getElementById('spinBtnPassChange');
        spin.innerHTML = !show ? '' : '<i class="fa fa fa-spinner fa-spin"></i>';     
    }
    
}