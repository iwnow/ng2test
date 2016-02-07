//--external modules
import {Component, OnInit} from 'angular2/core';
//--app modules
import * as Menu from '../utils/menu';

@Component({
    selector: 'ctoc-sidebar',
    templateUrl: 'app/view/ctoc-sidebar.html',
    inputs: ['menu']
})
export class C2cSidebar implements OnInit {
    menu: Menu.SidebarMenu;
    
    ngOnInit(){
        this.menu.Items[0].IsActive = true;    
    }
    
    choose(Id: string){
        this.menu.Items.forEach((i) => {
           if (i.Id == Id) {
               i.IsActive = true;
               return;
           }                
           i.IsActive = false; 
        });
    }
}