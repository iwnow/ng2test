
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

export interface IResult {
    result: boolean;
    reason?: string;
}
export interface ILoginResult extends IResult {    
}
export interface IRegisterResult extends IResult {
}
export interface IChangePassResult extends IResult {
    
}

export interface ICompany {
    name: string;
    registerDate: Date;
}
