import {IUserInfo, ICompany} from '../contracts/iuserinfo'

/** User difinition model */
export class User implements IUserInfo {
    constructor(
        public email: string,
        public password?: string,               
        public login?: string,
        public name?: string, 
        public secondName?: string, 
        public passwordConfirm?: string,
        public mobilePhone?: string,
        public avatar?: any,
        public roles?: string[]
    ) { }
    
    companies: ICompany[];
    
    static getUserByRegisterModel(user: ViewRegisterModel): IUserInfo {
        let u = new User(user.email, user.password);
        u.companies = [new Company(user.companyName)];
        return u;
    }
    static getUserByLoginModel(user: ViewLoginModel): IUserInfo {
        return new User(user.email, user.password);
    }
}

export class Company implements ICompany {
    registerDate: Date;
    constructor(
        public name: string
    ) {
        this.registerDate = new Date();
    }
}

export class ViewLoginModel {
    email: string;
    password: string;
}

export class ViewRegisterModel {
    email: string;
    companyName: string;
    password: string;
    confirmPassword: string;
}

export class ViewChangePassword {
    oldPassword:string;
    newPassword: string;
    confirmNewPassword: string;
}