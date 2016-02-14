import {Observable} from 'rxjs/Observable';

export interface IResourceService {
    getResourceByCulture(culture: Cultures): Observable<any>;
    getResource(): Observable<any>;
    setResource(culture: Cultures);
    getCurrentCulture():string;
    getNameByEnum(culture: Cultures):string;
    getCultureByName(name: string): Cultures;
    supportedCultures(): Cultures[];
}

export enum Cultures {
    ru = 0,
    en = 1
}