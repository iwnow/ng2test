//external modules
import {Injectable, Inject} from 'angular2/core';
//app modules
import {IServiceLocator, IUserService, IService} from '../contracts/iservices';
import {UserService} from './user.service';


/**
 * Сервис провайдер приложения
 */
@Injectable()
export class ServiceLocator {
    private _locator: IServiceLocator;
    
    constructor() {
        this._locator = new DefaultServiceLocator(
            new UserService()
        );
    }
    
    getService<T>(srvName: string): T {
        return this._locator.getService<T>(srvName);
    }
}

class DefaultServiceLocator implements IServiceLocator {
    
    constructor(
        private _userService: IUserService
    ) { }
    
    getService<T extends IService>(typeName: string): T {
        if (!typeName)
            throw "Parameter [typeName] must not be empty!";
               
        switch (typeName) {
            case 'IUserService':
                return <any>this._userService;
                break;
        
            default:
                throw `class [${typeName}] is not implemented!`;
                
        }
    }   
    
}
