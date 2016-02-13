//external modules
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
//app modules
import {IUserInfo, IUserService, ILoginResult, IRegisterResult} from '../contracts/all';
import * as Models from '../models/all';
//mock objects for tests
import {UserMock} from '../mocks/user.mock';

@Injectable()
export class UserService implements IUserService {
    private _currentUser: IUserInfo = null;
    
    private _registered: Map<string, IUserInfo> = new Map<string, IUserInfo>();
    
    constructor(){
        let u = UserMock.Create();
        this._registered.set(u.email, u);
    }
    
    getUserInfo():IUserInfo {
        return this._currentUser;
    }
    
    logOut() {
        this._currentUser = null;
    }
    
    logIn(user: Models.ViewLoginModel): Observable<ILoginResult> {
        let u = Models.User.getUserByLoginModel(user);        
        return Observable.fromPromise(new Promise<ILoginResult>((resolve) => {
            setTimeout(() => {
                let r: ILoginResult;
                if (!this._registered.has(u.email)) {                    
                    r = {result: false, reason: 'login failed'};
                } else {
                    let pass = this._registered.get(u.email).password;
                    if (pass == u.password) {
                        r = {result: true};
                        this._currentUser = u;
                        console.log(`success loged user ${this._currentUser.email}`);
                    }
                    else r = {result: false, reason: 'login failed'}; 
                }                 
                resolve(r);
            }, 3000);
        }));
    }
    
    register(user: Models.ViewRegisterModel): Observable<IRegisterResult> {
        let u = Models.User.getUserByRegisterModel(user);        
        return Observable.fromPromise(new Promise<IRegisterResult>((resolve) => {
            setTimeout(() => {
                let r: IRegisterResult = {result: true};
                console.log(`register user`);
                this._registered.set(u.email, u);
                resolve(r);
            }, 3000);
        }));
    }
    
    
    
    private loadUserInfo(): IUserInfo {
        return UserMock.Create();
    }
}




