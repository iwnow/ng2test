import {Component, OnInit, OnDestroy, Input} from 'angular2/core';


@Component({
    selector: 'ctoc-modal',
    template: `<div class="modal in" [style.display]="!show ? 'none' : 'block'">
	<div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
          <h4 class="modal-title">Modal title</h4>
        </div>
        <div class="modal-body">
          Content for the dialog / modal goes here.
        </div>
        <div class="modal-footer">
          <a href="#" data-dismiss="modal" class="btn">Close</a>
          <a href="#" class="btn btn-primary">Save changes</a>
        </div>
      </div>
    </div>
</div>`,
    inputs:['show']
})
export class C2cModal implements OnInit {
    @Input() show:boolean;
    
    constructor() { 
    }
    
    ngOnInit() {
        
    }
}