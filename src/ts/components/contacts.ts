import {Component, OnInit, OnDestroy} from 'angular2/core';

import {Contact} from '../models/all';
import {ContactMock} from '../mocks/all';

@Component({
    selector: 'ctoc-contacts',
    template: `
        <div class="page-header">menu items</div>
        <div *ngFor="#cntc of _contacts">
            {{cntc.givenName}}-{{cntc.familyName}}-{{cntc.mobilePhone}} 
        </div>
    `
})
export class C2cContacts implements OnInit {
    
    private _contacts: Contact[];
    
    ngOnInit() {
        if (!this._contacts)
            this._contacts = this.getContacts();
    }
    
    getContacts():Contact[] {
        console.log('loading contacts...');
        return ContactMock.getContacts(20);
    }
}