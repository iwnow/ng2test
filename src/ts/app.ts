import {User} from './user';
import {Component, OnInit} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

@Component({
    selector: 'my-app',
    templateUrl: 'app/view/home.html',
    providers: []
})
class MyApp implements OnInit{   
    name:string;
    person: User; 
    selectedPage: string;
    images: string[];
    selectedImg: string;
    
    ngOnInit(){
        document.getElementById('startScreen').style.display = 'none';
    }
    
    constructor(){        
        this.images = ['1.jpg','2.jpg','3.jpg'];
    }
    
    changedPage(pageName: string){
        this.selectedPage = pageName;
    }
}

bootstrap(MyApp);


