import {Injectable, Inject} from 'angular2/core';

import {EventService} from './event.service';
import {Descriptors} from '../utils/all';

@Injectable()
export class LoggerService {
    constructor(private _events: EventService){
        this.register();
    }
    
    private register(){
        this._events.subscribe(Descriptors.Logger, (data) => {
           console.log(`${Descriptors.Logger}:` + JSON.stringify(data)); 
        });
    }
}