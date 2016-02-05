import {IUserInfo} from '../contracts/iuserinfo';

export class UserMock {
    static Create(): IUserInfo {
        return {
          Name: 'MockName',
          Login: 'mock@mock.com',
          IsAuthorized: true,
          Roles: ['mock']  
        };
    }
}