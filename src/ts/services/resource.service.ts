import {IResourceService, Cultures} from '../contracts/all';

export class ResourceService implements IResourceService {
    private _resx: any;
    private _culture: Cultures = Cultures.ru;
    
    supportedCultures(): Cultures[] {
        return [Cultures.ru, Cultures.en];
    }
    getResource(): any {
        return this._resx;    
    }
    
    setResource(culture: Cultures) {
        this._culture = culture;
    }
    
    getNameByEnum(culture: Cultures):string {
        var res = '';
        switch (culture) {
            case Cultures.en:
                res = 'En';
                break;
            case Cultures.ru:
                res = 'Ru';
                break;
            default:
                break;
        }
        return res;
    }
    
    getCultureByName(name: string): Cultures {
        switch (name.toLowerCase()) {
            case 'ru':
                return Cultures.ru;
                break;
            case 'en':
                return Cultures.en;
            default:
                break;
        }
    }
}