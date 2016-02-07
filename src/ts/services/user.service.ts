//external modules
import {Injectable} from 'angular2/core';
//app modules
import {IUserInfo} from '../contracts/iuserinfo';
import {IUserService} from '../contracts/iservices';
//mock objects for tests
import {UserMock} from '../mocks/user.mock';

@Injectable()
export class UserService implements IUserService {
    getUserInfo():IUserInfo {
        return UserMock.Create();
    }
}




