
export interface IUserInfo {
    email: string,
    password: string,               
    login?: string,
    name?: string, 
    secondName?: string, 
    passwordConfirm?: string,
    mobilePhone?: string,
    avatar?: any
    /** absolete - use method from userService [isAuthorized(IUserInfo)] */
    isAuthorized?: boolean;
    roles?: string[];
}
