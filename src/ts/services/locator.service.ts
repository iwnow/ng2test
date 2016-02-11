//external modules
import {Injectable, Inject} from 'angular2/core';
//app modules
import {IServiceLocator, IUserService, 
        IService, IEmitData, IEventService,
        IResourceService} from '../contracts/all';
import {UserService} from './user.service';
import {EventService} from './event.service';
import {ResourceService} from './resource.service';

/**
 * Сервис провайдер приложения
 */
@Injectable()
export class ServiceLocator {
    private _locator: IServiceLocator;
    
    constructor() {
        this._locator = new DefaultServiceLocator(
            new UserService(),
            new EventService(),
            new ResourceService()
        );
    }
    
    getService<T>(srvName: string): T {
        return this._locator.getService<T>(srvName);
    }
}

class DefaultServiceLocator implements IServiceLocator {
    
    constructor(
        private _userService: IUserService,
        private _eventService: IEventService,
        private _resxService: IResourceService
    ) { }
    
    getService<T>(typeName: string): T {
        if (!typeName)
            throw "Parameter [typeName] must not be empty!";
               
        switch (typeName) {
            case 'IUserService':
                return <any>this._userService;
                break;
            case 'IEventService':
                return <any>this._eventService;
                break;
            case 'IResourceService':
                return <any>this._resxService;
                break;
            default:
                throw `class [${typeName}] is not implemented!`;
                
        }
    }   
    
}
