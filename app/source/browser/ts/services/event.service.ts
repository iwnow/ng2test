import {EventEmitter, Injectable} from 'angular2/core';
import {IEmitData} from '../contracts/iemitdata';
import {IEventService} from '../contracts/ieventservice';

@Injectable()
export class EventService implements IEventService {
    private emitter: EventEmitter<IEmitData>;
    constructor(){
        this.emitter = new EventEmitter<IEmitData>(true);
    }
    
    emit(data: IEmitData){
        this.emitter.emit(data);
    }
    
    subscribe(key: string, callback: (data: any)=>void): any {
        return this.emitter.subscribe((i) => {
            var d  = <IEmitData>i;
            if (key != d.key)
                return;
            callback(d.data);
        });
    }
}