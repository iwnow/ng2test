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
            false,
            ['mock']            
        );
        u.companies = [new Company('Самая лучшая компания')];
        return u;
    }
}