import {Component, OnInit, Input, Output} from 'angular2/core';

import * as Menu from '../utils/menu';


@Component({
    selector: 'ctoc-content',
    templateUrl: 'app/view/ctoc-content.html',
    inputs: ['contentHeader', 'sidebarSelectedMenuItem']
})
export class C2cContent implements OnInit {
    @Input() sidebarSelectedMenuItem: Menu.MenuItem;
    @Input() contentHeader: string;
    
    ngOnInit(){}
    constructor(){}
    
    
}