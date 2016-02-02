import {User} from './user';
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

class UserProvider{
    private _usr: User;
    private _i = 23;
    constructor(){
        this._usr = new User(++this._i, "Chad");
    }
    getUser():User {
        
        return this._usr;
    }
}

@Component({
    selector: 'my-app',
    templateUrl: 'app/views/home.html',
    providers: [UserProvider]
})
class MyApp{   
    name:string;
    person: User; 
    selectedPage: string;
    images: string[];
    selectedImg: string;
    
    constructor(userProvider: UserProvider){
        document.getElementById('startScreen').style.display = 'none';
        this.person = userProvider.getUser();
        this.name = this.person.info();
        this.images = ['1.jpg','2.jpg','3.jpg'];
    }
    
    changedPage(pageName: string){
        this.selectedPage = pageName;
    }
}

bootstrap(MyApp);


