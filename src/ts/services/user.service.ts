//external modules
import {Injectable} from 'angular2/core';
//app modules
import {IUserInfo} from '../contracts/iuserinfo';
import {IUserService} from '../contracts/iservices';
//mock objects for tests
import {UserMock} from '../mocks/user.mock';

@Injectable()
export class UserService implements IUserService {
    private _currentUser: IUserInfo;
    
    getUserInfo():IUserInfo {
        if (!this._currentUser)
            this._currentUser = this.loadUserInfo();
        return this._currentUser;
    }
    
    logOut(){
        this._currentUser.isAuthorized = false;
    }
    
    isAuthorized(user: IUserInfo): boolean {
        return user.isAuthorized;
    }
    
    private loadUserInfo(): IUserInfo {
        return UserMock.Create();
    }
}




