import * as userCore from './iuserinfo';

export interface IUserInfoService extends IService {
    getUserInfo():userCore.IUserInfo;
}

export interface IServiceLocator extends IService {
    getService<T extends IService>(arg: string): T;
}

export interface IService {
    
}