export class User{
    constructor(public Age:number, public Name:string){
        
    }
    
    info():string{        
        return `Name: ${this.Name}, Age: ${this.Age}`;
    }
}