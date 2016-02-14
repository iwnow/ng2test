
export interface IUserInfo {
    email: string,
    password: string,               
    login?: string,
    name?: string, 
    secondName?: string, 
    passwordConfirm?: string,
    mobilePhone?: string,
    avatar?: any
    roles?: string[];
    
    companies?: ICompany[];
}

export interface ILoginResult {
    result: boolean;
    reason?: string;
}
export interface IRegisterResult extends ILoginResult {
}

export interface ICompany {
    name: string;
    registerDate: Date;
}
