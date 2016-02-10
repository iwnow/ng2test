import * as userCore from './iuserinfo';

export interface IUserService extends IService {
    getUserInfo():userCore.IUserInfo;
    logOut();
    isAuthorized(user: userCore.IUserInfo):boolean;
}

export interface IServiceLocator extends IService {
    getService<T extends IService>(arg: string): T;
    
}

export interface IService {
    
}