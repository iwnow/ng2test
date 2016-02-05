import {IUserInfo} from '../contracts/iuserinfo';
import {IUserInfoService} from '../contracts/iservices';

import {UserMock} from '../mocks/user.mock';

export class UserInfoService implements IUserInfoService {
    getUserInfo():IUserInfo {
        return UserMock.Create();
    }
}




