export class User {
    constructor(
        public email: string,
        public password: string,               
        public login?: string,
        public name?: string, 
        public secondName?: string, 
        public passwordConfirm?: string,
        public mobilePhone?: string,
        public avatar?: any,
        public roles?: string[]
    ) { }
    
    companies: Company[];
    
}

export class Company {
    registerDate: Date;
    accessToken: string;
    
    constructor(public name: string) {
        this.registerDate = new Date();
    }
}