import {User} from './user';
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

document.addEventListener("DOMContentLoaded", (e) =>{
    var man = new User(25, "Jon");
    console.log("DOMContentLoaded! " + man.info());
});

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>'
})
class MyApp{    
}

bootstrap(MyApp);


