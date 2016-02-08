//--external modules
import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';
//--app modules
import * as Menu from '../utils/menu';

@Component({
    selector: 'ctoc-sidebar',
    templateUrl: 'app/view/ctoc-sidebar.html',
    inputs: ['menu'],
    outputs: ['selectedPage']
})
export class C2cSidebar implements OnInit {
    @Input() menu: Menu.SidebarMenu;
    @Output() selectedPage = new EventEmitter<Menu.MenuItem>(true);
    
    ngOnInit(){
        if (!this.menu.Items.find((i) => i.IsActive == true)){
                this.choose(this.menu.Items[0].Id);  
                return;
        }
        this.selectedPage.emit(this.menu.Items.find((i) => i.IsActive == true));
    }
    
    choose(Id: string){
        this.menu.Items.forEach((i) => {
           if (i.Id == Id) {
               i.IsActive = true;
               this.selectedPage.emit(i);
               return;
           }                
           i.IsActive = false; 
        });
    }
}