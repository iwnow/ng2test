import {IUserInfo} from '../contracts/iuserinfo'

/** User difinition model */
export class User implements IUserInfo {
    constructor(
        public email: string,
        public password: string,               
        public login?: string,
        public name?: string, 
        public secondName?: string, 
        public passwordConfirm?: string,
        public mobilePhone?: string,
        public avatar?: any,
        public isAuthorized?: boolean,
        public roles?: string[]
    ) { }
}