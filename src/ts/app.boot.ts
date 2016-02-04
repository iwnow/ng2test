import {Component, OnInit} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';

import {C2cMenu, C2cMenuItem} from './components/menu';

@Component({
    selector: 'ctoc-app',
    templateUrl: 'app/view/ctoc.html',
    directives: [C2cMenu],
    providers: [ ]
})
class CtocApp implements OnInit{   
    
    ngOnInit(){
        document.getElementById('startScreen').style.display = 'none';
        document.getElementsByTagName('html')[0].classList.remove('startBody');
        document.body.classList.remove('startBody');
    }
    
    constructor(){        
    }
}

bootstrap(CtocApp);


