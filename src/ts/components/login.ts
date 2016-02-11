import {Component, OnInit} from 'angular2/core';
import {NgForm}    from 'angular2/common';

import {ServiceLocator} from '../services/all';
import {IUserInfo, IUserService, IEmitData, IEventService} from '../contracts/all';


@Component({
  selector: 'ctoc-login',
  templateUrl: 'app/view/ctoc-login.html'
})
export class C2cLogin implements OnInit {
    btnSendTxt: string;
    loginFormCaption = "Login Form";
    emailLabelText = "from class email";
    passLabelText = "from class pass";
    resourceName = "Send";
    
    constructor(private _locator: ServiceLocator){
        this._model = this.userService.getUserInfo(); 
        this.btnSendTxt = this.resourceName;     
        //set event on resize
        this.registerResizeListening();
        //set event on lang changed
        this.registerLangChanged();
    }
    
    private registerResizeListening(){
        var t = document.getElementById('loginTable');
        t.style.height = (window.innerHeight - 70).toString() + 'px';
        this.eventService.subscribe('resize', (data) => {
           t.style.height = data.height > 400 ? (data.height - data.height/3).toFixed(0).toString() + 'px' : '400px';
        });
    }
    
    private registerLangChanged(){
        this.eventService.subscribe('lang:changed', (data) => {
           console.log('lang changed!!!!! ' + data); 
        });
    }
    
    ngOnInit(){      
        this.showSpinner(false);
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
        
        this.eventService.emit({key: "login", data: "sended from login"});
        
        if (!this._isSending) {
            this._isSending = true;
            this.showSpinner();
            setTimeout(() => {
                this.showSpinner(false);
                this._isSending = false;
            }, 3000);
        }
        
    }
    
    showSpinner(show: boolean = true){
        var spin = document.getElementById('spinBtnLogin');
        if (!show) {
            spin.innerHTML = '';
            this.btnSendTxt = this.resourceName;
        }
        else {
            this.btnSendTxt = '';
            spin.innerHTML = '<i class="fa fa fa-spinner fa-spin"></i>';    
        }            
    }
}