import {IServiceLocator, IUserInfoService, IService} from '../contracts/iservices';
import {UserInfoService} from './user.service';

/**
 * Сервис провайдер приложения
 */
export class ServiceLocator {
    private _locator: IServiceLocator;
    
    constructor() {
        this._locator = new DefaultServiceLocator();
    }
    
    getService(srvName: string): IService {
        return this._locator.getService(srvName);
    }
}

class DefaultServiceLocator implements IServiceLocator {
    getService(typeName: string): IService {
        switch (typeName) {
            case 'IUserInfoService':
                return new UserInfoService();
                break;
        
            default:
                throw `class [${typeName}] is not implemented!`;
                
        }
    }
}