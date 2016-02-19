import {Contact} from '../models/all';

export class ContactMock {
    static getContact():Contact {
        let c = new Contact();
        c.givenName = 'mock';
        c.familyName = 'mocker';
        c.middleName = 'test';
        c.avatar = 'mock.png';
        c.internalPhone = '3021';
        c.mail = 'mock@mock.com';
        c.mobilePhone = '89321732154';
        c.position = 'team lead';
        c.subdivision = 'system development';
        c.workPhone = '89321732154'; 
        return c;
    }
    
    static getContacts(n: number):Contact[]{
        let ca:Contact[] = [];
        for(var i=0;i<n;i++) {
            let c = ContactMock.getContact();
            c.givenName += i;
            ca.push(c);
        }
        return ca;
    }
}