import {Observable} from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';

import {IUserInfo, ILoginResult, IRegisterResult, IChangePassResult} from './iuserinfo';
import {ViewLoginModel, ViewRegisterModel, ViewChangePassword} from '../models/all';

export interface IUserService extends IService {
    getUserInfo():IUserInfo;
    logOut();
    logIn(user: ViewLoginModel): Observable<ILoginResult>;
    register(user: ViewRegisterModel): Observable<IRegisterResult>;
    changePassword(model: ViewChangePassword): Observable<IChangePassResult>;
}

export interface IServiceLocator extends IService {
    getService<T extends IService>(arg: string): T;    
}

export interface IService {
}