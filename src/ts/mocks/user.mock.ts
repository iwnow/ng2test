import {IUserInfo} from '../contracts/iuserinfo';
import {User, Company} from '../models/user'

export class UserMock {
    static Create(): IUserInfo {
        let u = new User(
            'mock@mock.com',
            'q',
            'mockLogin',
            'mock',
            'mock mock',
            'q',
            '89638123462',
            null,
            ['mock']            
        );
        u.companies = [new Company('Github')];
        return u;
    }
}