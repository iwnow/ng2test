import {Observable} from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';

import {IUserInfo, ILoginResult, IRegisterResult} from './iuserinfo';
import {ViewLoginModel, ViewRegisterModel} from '../models/all';

export interface IUserService extends IService {
    getUserInfo():IUserInfo;
    logOut();
    logIn(user: ViewLoginModel): Observable<ILoginResult>;
    register(user: ViewRegisterModel): Observable<IRegisterResult>;
}

export interface IServiceLocator extends IService {
    getService<T extends IService>(arg: string): T;    
}

export interface IService {
}