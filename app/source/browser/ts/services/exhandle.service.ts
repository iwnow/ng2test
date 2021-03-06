import {Injectable, Inject} from 'angular2/core';

import {EventService} from './event.service';
import {Descriptors} from '../utils/all';

@Injectable()
export class ExceptionService {
    constructor(private _events: EventService){
        this.register();
    }
    
    private register(){
        //console.log('ExceptionService registered');
        this._events.subscribe(Descriptors.Exceptions, (data) => {
           console.error(`${Descriptors.Exceptions}:` + JSON.stringify(data)); 
        });
    }
}