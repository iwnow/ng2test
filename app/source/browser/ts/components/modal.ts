import {Component, OnInit, 
        OnDestroy, Input,
        Output, EventEmitter} from 'angular2/core';

import {EventService} from '../services/all';
import {Descriptors} from '../utils/all';

// [style.display]="!show ? 'none' : 'block'"
@Component({
    selector: 'ctoc-modal-info',
    template: `<div class="modal in" style="display:block;"                
                [style.margin-top]="topOffsetModal">
                <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">                    
                    <button type="button" (click)="closeModal()" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title"><span class="glyphicon glyphicon-info-sign"></span>&nbsp;{{title}}</h4>
                    </div>
                    <div class="modal-body">
                    {{msg}}
                    </div>
                    <div class="modal-footer">
                        <a href="#" (click)="okModal()" class="btn btn-primary">OK</a>
                    </div>
                </div>
                </div>
            </div>`,    
    inputs:['title', 'msg'],
    styles: [`
        .modal-header {
            color: #fff;
            background-color: #428bca;
        }
    `]
})
export class C2cModalInfo implements OnInit, OnDestroy {
    @Input() title: string;
    @Input() msg: string;
    
    @Output() close = new EventEmitter<any>(true);
    @Output() ok = new EventEmitter<any>(true);
    
    _winResizeSub: any;
    topOffsetModal: string;
    
    constructor(private _events:EventService) { 
        let h = window.innerHeight;
        this.topOffsetModal = h/4 + 'px';
    }
    
    ngOnInit() {
        console.log('init modal');
        this._winResizeSub = this._events.subscribe(
            Descriptors.WinResize,
            (data) => {
                this.topOffsetModal = data.height/4 + 'px';
            }
        );
    }
    
    closeModal(){
        this.close.emit({});
    }
    
    okModal(){
        this.ok.emit({});
    }
    
    ngOnDestroy(){
        this._winResizeSub.unsubscribe();
    }
}