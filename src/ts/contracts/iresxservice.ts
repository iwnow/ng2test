export interface IResourceService {
    getResource(): any;
    setResource(culture: Cultures);
}

export enum Cultures {
    ru = 0,
    en = 1
}