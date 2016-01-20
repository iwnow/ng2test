import {User} from './user';
import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

var man = new User(25, "Jon");
console.log("DOMContentLoaded! " + man.info());
let p = new Promise((res, rej) => {
    setTimeout(function() {
        res("timeout finished :)");
    }, 5000);
}).then((r)=>{
    console.log(`from promis r: ${r}`);
});

@Component({
    selector: 'my-app',
    template: '<h1>{{name}}</h1>'
})
class MyApp{   
    name:string = "prop from class"; 
}

bootstrap(MyApp);


