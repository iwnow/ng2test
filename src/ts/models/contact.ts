export class Contact {
    id: number;
    givenName: string; 
    familyName: string; 
    middleName: string;
    mail: string;         
    position: string;        
    subdivision: string;
    mobilePhone: string; 
    workPhone: string;
    internalPhone: string;
    
    private _avatar: string;
    get avatar(): string {
        return this._avatar || 'app/img/user-pic-tmp.png';
    }
    set avatar(val: string) {
        this._avatar = val;
    }
}