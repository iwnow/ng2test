import {Component, OnInit} from 'angular2/core';
import {NgForm}    from 'angular2/common';

import {ServiceLocator} from '../services/all';
import {IUserInfo, IUserService} from '../contracts/all';


@Component({
  selector: 'ctoc-login',
  templateUrl: 'app/view/ctoc-login.html'
})
export class C2cLogin implements OnInit {
    constructor(private _locator: ServiceLocator){
        this._model = this.userService.getUserInfo();
    }
    
    ngOnInit(){
        var t = document.getElementById('loginTable');
        t.style.height = (window.innerHeight - 70).toString() + 'px';
        window.addEventListener('resize', (e) => {
            t.style.height = window.innerHeight > 400 ? (window.innerHeight - window.innerHeight/3).toFixed(0).toString() + 'px' : '400px';
        });
    }
    
    get userService(): IUserService {
        return this._locator.getService<IUserService>('IUserService');
    }
    
    private _model: IUserInfo;
    get model():IUserInfo { return this._model;}
    set model(val: IUserInfo){
        this._model = val;
    }
}