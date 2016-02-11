export interface IResourceService {
    getResource(): any;
    setResource(culture: Cultures);
    getNameByEnum(culture: Cultures):string;
    getCultureByName(name: string): Cultures;
    supportedCultures(): Cultures[];
}

export enum Cultures {
    ru = 0,
    en = 1
}