import {Contact} from '../models/all';

export class ContactMock {
    static _seq = 0;
    static getContact():Contact {
        ContactMock._seq++;
        let c = new Contact();
        c.id = ContactMock._seq;
        c.givenName = 'mock';
        c.familyName = 'mocker';
        c.middleName = 'test';
        c.avatar = 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png';
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
        let mp = 89321732154, ip = 3021;
        for(var i=0;i<n;i++) {
            let c = ContactMock.getContact();
            c.givenName += i;
            c.internalPhone = (mp + i).toString();
            c.mobilePhone = (ip + i*i).toString();
            ca.push(c);
        }
        return ca;
    }
}