//--external modules
import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';
//--app modules
import * as Menu from '../utils/menu';

@Component({
    selector: 'ctoc-sidebar',
    inputs: ['menu'],
    outputs: ['selectedPage'],
    template: `
    <div class="col-sm-3 col-md-2 sidebar">
        <ul class="nav nav-sidebar">
            <li *ngFor="#mitem of menu.Items" [ngClass]="mitem.IsActive ? 'active' : ''">
                <a href="#" (mousedown)="choose(mitem.Id)">{{mitem.TextItem}}</a>
            </li>
        </ul>         
    </div>
    `
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
        // if (this.menu.outerDataChanged) {
        //     //modal dialo for save data before change menu item
        //     if (!confirm('Не сохраненные данные будут потеряны. Продолжить?'))
        //         return;
        // }
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