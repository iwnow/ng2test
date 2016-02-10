import {IUserInfo} from '../contracts/iuserinfo';
import {User} from '../models/user'

export class UserMock {
    static Create(): IUserInfo {
        return new User(
            'mock@mock.com',
            'q',
            'mockLogin',
            'mock',
            'mock mock',
            'q',
            '',
            null,
            false,
            ['mock']            
        );
    }
}