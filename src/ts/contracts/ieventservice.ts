import {IEmitData} from './iemitdata';

export interface IEventService {
    emit(data: IEmitData);
    
    subscribe(key: string, callback: (data: any)=>void);
}