import {IServiceLocator, IUserService, IService} from '../contracts/iservices';
import {UserService} from './user.service';

/**
 * Сервис провайдер приложения
 */
export class ServiceLocator {
    private _locator: IServiceLocator;
    
    constructor() {
        this._locator = new DefaultServiceLocator();
    }
    
    getService<T>(srvName: string): T {
        return this._locator.getService<T>(srvName);
    }
}

class DefaultServiceLocator implements IServiceLocator {
    getService<T extends IService>(typeName: string): T {
        var srv: any;     
        if (!typeName)
            throw "Parameter [typeName] must not be empty!";
               
        switch (typeName) {
            case 'IUserService':
                srv = new UserService();
                return srv;
                break;
        
            default:
                throw `class [${typeName}] is not implemented!`;
                
        }
    }
    
    
}