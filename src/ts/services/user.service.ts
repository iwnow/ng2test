//external modules
import {Injectable, Inject} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';
//app modules
import {IUserInfo, IUserService, ILoginResult, IRegisterResult, IChangePassResult} from '../contracts/all';
import {EventService} from './event.service';
import * as Models from '../models/all';
//mock objects for tests
import {UserMock} from '../mocks/all';
import {Descriptors} from '../utils/all';

@Injectable()
export class UserService implements IUserService {
    private _currentUser: IUserInfo = null;
    
    private _registered: Map<string, IUserInfo> = new Map<string, IUserInfo>();
    
    constructor(private _eventsService: EventService){
        let u = UserMock.Create();
        this._registered.set(u.email, u);
        this._currentUser = u;
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
                    let userDb = this._registered.get(u.email);
                    if (userDb.password == u.password) {
                        r = {result: true};
                        this._currentUser = userDb;
                        console.dir(this._currentUser);
                    }
                    else r = {result: false, reason: 'login failed'}; 
                }                 
                resolve(r);
            }, 1000);
        }));
    }
    
    register(user: Models.ViewRegisterModel): Observable<IRegisterResult> {
        let u = Models.User.getUserByRegisterModel(user);        
        return Observable.fromPromise(new Promise<IRegisterResult>((resolve) => {
            setTimeout(() => {
                let r: IRegisterResult = {result: true};
                this._registered.set(u.email, u);
                resolve(r);
            }, 1000);
        }));
    }
    
    changePassword(model: Models.ViewChangePassword): Observable<IChangePassResult> {
        return Observable.fromPromise(
            new Promise<IChangePassResult>((resolve, reject) => {
                let r: IChangePassResult = {result:true};
                resolve(r);
            }).catch((e) => {
                this._eventsService.emit({key: Descriptors.Exceptions,data:e, who:'UserService.changePassword'});
                let r: IChangePassResult = {result:false,reason:e};
                return r;
            })
        );
    }
    
    private loadUserInfo(): IUserInfo {
        return UserMock.Create();
    }
}




