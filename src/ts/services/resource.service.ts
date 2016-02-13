import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Http, Response} from 'angular2/http';

import {IResourceService, Cultures, IEventService} from '../contracts/all';
import {EventService} from './event.service';
import {Descriptors, Log} from '../utils/all';

@Injectable()
export class ResourceService implements IResourceService {
    private _culture: Cultures = Cultures.ru;
    private _urlResx = 'app/resources/';
    private _srvName = 'ResourceService';
    private _eventService: IEventService;
    private _cacheJson: Map<Cultures, any>;
    private _cultureIsProgressFromServer: Set<Cultures>;
    
    
    constructor(private _http: Http,
                private _events: EventService){ 
        this._eventService = _events;
        this._cacheJson = new Map<Cultures, any>();
        this._cultureIsProgressFromServer = new Set<Cultures>();
    }
    
    supportedCultures(): Cultures[] {
        return [Cultures.ru, Cultures.en];
    }
    
    getResource(): Observable<any> {
        return this.getResourceByCulture(this._culture);    
    }
    
    getResourceByCulture(culture: Cultures): Observable<any> {
        if (this._cacheJson.has(this._culture))
            return Observable.fromPromise(Promise.resolve(this._cacheJson.get(this._culture)));
        return this.resxFromServer(this._culture);      
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
    
    //@Log()
    private resxFromServer(culture: Cultures): Observable<any>{  
        if (this._cultureIsProgressFromServer.has(culture)) {
            let p = new Promise((resolve) => {
                let i = setInterval(() => {
                    if (!this._cultureIsProgressFromServer.has(culture)){
                        resolve(this._cacheJson.get(culture));
                        clearInterval(i);
                    }                        
                }, 200);    
            });
            return Observable.fromPromise(p);
        } 
        else this._cultureIsProgressFromServer.add(culture);      
        let resxName = this.getNameByEnum(culture).toLowerCase();
        return this._http        
                    .get(`${this._urlResx}${resxName}.json`)
                    .map((res) => {
                        let o = res.json();
                        this._cacheJson.set(culture, o);
                        if (this._cultureIsProgressFromServer.has(culture))
                            this._cultureIsProgressFromServer.delete(culture);
                        return o;
                    })
                    .catch((e, s, c) => {
                        //emit in event bus with global exception key
                        if (this._cultureIsProgressFromServer.has(culture))
                            this._cultureIsProgressFromServer.delete(culture);
                        this._events.emit({
                            key: Descriptors.Exceptions, 
                            data:e.text()
                        });
                        //return null in observable over promise (should find methond in Observable like Promise.resolve())
                        return Observable.fromPromise(Promise.resolve(null));
                    });
    }
    
    
}