//external modules
import {Injectable, Inject} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers} from 'angular2/http';
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
    
    constructor(private _eventsService: EventService, private _http: Http){
        //let u = UserMock.Create();
        //this._registered.set(u.email, u);
        //this._currentUser = u;
    }
    
    getUserInfo():IUserInfo {
        return this._currentUser;
    }
    
    logOut() {
        let self = this;
        let _out = () => {
            self._currentUser = null;
        };
        
        this._http.post('/api/logout', '').subscribe(res => {
            _out();
        }, e => {
            this._eventsService.emit({
                key: Descriptors.Exceptions,
                data: e
            });
            _out();
        });
    }
    
    logIn(user: Models.ViewLoginModel): Observable<ILoginResult> {
        let u = Models.User.getUserByLoginModel(user);     
        let userJson = JSON.stringify(u);   
        return Observable.fromPromise(new Promise<ILoginResult>((resolve, reject) => {
            let r: ILoginResult = {result: false, reason: 'fail'};
            //for application/x-www-form-urlencoded
            let rbody = `email=${u.email}&password=${u.password}`;
            
            let header = new Headers();
            //header.append('Content-Type', 'application/x-www-form-urlencoded');
            header.append('Content-Type', 'application/json');
            this._http.post('/api/login', userJson, {headers: header})
                .map(res => res.json())
                .subscribe(
                    data => {
                        if (data.email != undefined) {
                            r.result = true;
                            r.reason = '';
                            let _user = new Models.User(data.email);
                            let _company = new Models.Company(data.companies[0]);
                            _company.registerDate = new Date(Date.parse(data.created)); 
                            _user.companies = [_company];
                            
                            this._currentUser = _user;
                            return resolve(r);
                        }
                        resolve(r);
                    },
                    error => {
                        reject(error);
                    }
                );
        }));
        /*
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
        */
    }
    
    register(user: Models.ViewRegisterModel): Observable<IRegisterResult> {
        let u = Models.User.getUserByRegisterModel(user);     
        let userJson = JSON.stringify(u);   
        return Observable.fromPromise(new Promise<IRegisterResult>((resolve, reject) => {
            let r: IRegisterResult = {result: false, reason: 'fail'};
            //for application/x-www-form-urlencoded
            //let rbody = `email=${u.email}&password=${u.password}`;
            
            let header = new Headers();
            //header.append('Content-Type', 'application/x-www-form-urlencoded');
            header.append('Content-Type', 'application/json');
            this._http.post('/api/register', userJson, {headers: header})
                .map(res => res.json())
                .subscribe(
                    data => {
                        if (data.ecode != undefined) {
                            r.reason = data.ecode;
                            return resolve(r);
                        }
                        if (data.email != undefined) {
                            r.result = true;
                            r.reason = 'register success';
                            return resolve(r);
                        }
                        resolve(r);
                    },
                    error => {
                        reject(error);
                    }
                );
        }));
        /*let u = Models.User.getUserByRegisterModel(user);        
        return Observable.fromPromise(new Promise<IRegisterResult>((resolve) => {
            setTimeout(() => {
                let r: IRegisterResult = {result: true};
                this._registered.set(u.email, u);
                resolve(r);
            }, 1000);
        }));
        */
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
        return null; //UserMock.Create();
    }
    
    private log(msg: string) {
        this._eventsService.emit({
           data: msg,
           key: Descriptors.Logger 
        });
    }
}




