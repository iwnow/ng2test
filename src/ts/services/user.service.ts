import {IUserInfo} from '../contracts/iuserinfo';
import {IUserService} from '../contracts/iservices';

import {UserMock} from '../mocks/user.mock';

export class UserService implements IUserService {
    getUserInfo():IUserInfo {
        return UserMock.Create();
    }
}




