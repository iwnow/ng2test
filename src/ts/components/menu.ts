import {Component, OnInit, Input} from 'angular2/core';

@Component({
    selector: 'ctoc-menu',
    templateUrl: 'app/view/ctoc-menu.html'
})
export class C2cMenu implements OnInit {
    
    @Input() menuItems: C2cMenuItem[];
    
    ngOnInit(){
        
    }
}

export class C2cMenuItem {
    id: string;
    parentItem: C2cMenuItem;
    textContent: string;
}