import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from 'angular2/core';

import {Contact} from '../models/all';
import {ServiceLocator} from '../services/all';
import {IResourceService, IEventService, Cultures} from '../contracts/all';
import {Descriptors, Validators} from '../utils/all';

@Component({
    selector: 'ctoc-contact-edit',
    template: `
    <div style="height:100%">
    <h4 class="page-header">{{_header}}</h4>
        <div class="row" style="height:calc(100% - 49px)">
            <!-- left column -->
            <div class="col-md-4 col-sm-6 col-xs-12">
                <div class="text-center">
                    <img [style.height.px]="200" [style.width.px]="200"
                        [src]="model.avatar" 
                        class="avatar img-circle img-thumbnail" alt="avatar">
                    <h6>{{_uploadPhoto}}</h6>
                    <input id="photoloader" type="file" 
                        class="text-center center-block well well-sm" 
                        style="width:100%"
                        (change)="changeFile($event)"
                        >
                </div>
            </div>
            <!-- edit form column -->
            <div class="col-md-8 col-sm-6 col-xs-12 personal-info">
            
            <form class="form-horizontal" role="form">
                <div class="form-group">
                    <label class="col-lg-3 control-label">{{_givenName}}:</label>
                    <div class="col-lg-8">
                        <input class="form-control" [(ngModel)]="model.givenName" [placeholder]="_givenName" type="text">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">{{_middleName}}:</label>
                    <div class="col-lg-8">
                        <input class="form-control" [(ngModel)]="model.middleName" [placeholder]="_middleName" type="text">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">{{_familyName}}:</label>
                    <div class="col-lg-8">
                        <input class="form-control" [(ngModel)]="model.familyName" [placeholder]="_familyName" value="" type="text">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">{{_mail}}:</label>
                    <div class="col-lg-8">
                        <input class="form-control" [(ngModel)]="model.mail" [placeholder]="_mail" type="text">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">{{_position}}:</label>
                    <div class="col-lg-8">
                        <input class="form-control" [(ngModel)]="model.position" [placeholder]="_position" type="text">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">{{_subdivision}}:</label>
                    <div class="col-lg-8">
                        <input class="form-control" [(ngModel)]="model.subdivision" [placeholder]="_subdivision" type="text">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">{{_mobilePhone}}:</label>
                    <div class="col-lg-8">
                        <input class="form-control" [(ngModel)]="model.mobilePhone" [placeholder]="_mobilePhone" type="text">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">{{_workPhone}}:</label>
                    <div class="col-lg-8">
                        <input class="form-control" [(ngModel)]="model.workPhone" [placeholder]="_workPhone" type="text">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-lg-3 control-label">{{_internalPhone}}:</label>
                    <div class="col-lg-8">
                        <input class="form-control" [(ngModel)]="model.internalPhone" [placeholder]="_internalPhone" type="text">
                    </div>
                </div>
                
                <div class="form-group">
                <label class="col-lg-3 control-label"></label>
                <div class="col-lg-8">
                    <input class="btn btn-primary" [value]="_saveBtn" type="button" (click)="saveClick()">
                    <span></span>
                    <input class="btn btn-default" [value]="_cancelBtn" type="button" (click)="cancelClick()">
                </div>
                </div>
            </form>
            </div>
        </div>
     </div>
    `
})
export class C2cContactEdit implements OnInit, OnDestroy {
    /** true - add, false - edit */
    @Input() addOrEdit: boolean;
    /**data editing - if !model then add new model */
    @Input() model: Contact;
    /** create / edited return model */
    @Output() ok = new EventEmitter<Contact>();
    /**cancel editing / creating */
    @Output() cancel = new EventEmitter<any>();
    
    private _resx: any;
    private _langChangeSubscription: any;
    
    private _header: string;
    private _saveBtn: string;
    private _cancelBtn: string;
    private _uploadPhoto: string;
    private _givenName: string;
    private _middleName: string;
    private _familyName: string;
    private _mail: string;
    private _position: string;
    private _subdivision: string;
    private _mobilePhone: string;
    private _workPhone: string;
    private _internalPhone: string;
    private _avatar: string;
    
    constructor(private _locator: ServiceLocator){}
    
    private get eventService(): IEventService {
        return this._locator.getService<IEventService>('IEventService');
    }
    
    private registerLangChanged(){
        this._langChangeSubscription = this.eventService.subscribe(Descriptors.LanguageChange, (data) => {
            this.updateResource(data);
        });
    }
    
    private updateCultureUI(resx: any){
        if (!resx) {
            this.eventService.emit({key: Descriptors.Exceptions, data: '[contact-edit.ts:updateCultureUI(resx: any)]: при обовлении UI передан пустой ресурс!'});
            return;
        }
        this._resx = resx;
        this._header = this.addOrEdit ? this._resx.contactEdit.addTitle : this._resx.contactEdit.editTitle;
        this._cancelBtn = this._resx.contactEdit.cancel;        
        this._saveBtn = this._resx.contactEdit.save;        
        this._uploadPhoto = this._resx.contactEdit.uploadPhoto;    
        this._givenName = this._resx.table.givenName;
        this._middleName = this._resx.table.middleName;
        this._familyName = this._resx.table.familyName;
        this._mail = this._resx.table.mail;
        this._position = this._resx.table.position;
        this._subdivision = this._resx.table.subdivision;
        this._mobilePhone = this._resx.table.mobilePhone;
        this._workPhone = this._resx.table.workPhone;
        this._internalPhone = this._resx.table.internalPhone;   
    }
    
    private updateResource(culture: Cultures){
        this._locator.getService<IResourceService>('IResourceService')
            .getResourceByCulture(culture)
            .subscribe(data => {
                this.updateCultureUI(data.controlPanel.contactsPan);
            });
    }
    
    ngOnInit() {
        if (!this.model)
            this.model = new Contact();
        this.registerLangChanged();
        this._locator.getService<IResourceService>('IResourceService')
            .getResource()
            .subscribe(data => {
                this.updateCultureUI(data.controlPanel.contactsPan);
            });
        //photoloader
        let infile = <HTMLInputElement>document.getElementById('photoloader');
        infile.value = '';
    }
    
    ngOnDestroy() {
        this._langChangeSubscription.unsubscribe();
    }
    
    saveClick() {
        this.ok.emit(this.model);
    }
    
    cancelClick() {
        this.cancel.emit(null);
    }
    
    changeFile($event) {
        try {
            let data = $event && $event.target && $event.target.files && $event.target.files[0];
            if (!data)
                return;
            if ((<File>data).type.indexOf('image') < 0)
                return;
            let file = <File>data;
            let fr = new FileReader();
            fr.onload = (ev) => {
                this.model.avatar = (<any>ev.target).result;
            };
            fr.readAsDataURL(file);
        } catch (e) {
            this._locator.getService<IEventService>('IEventService').emit({
                data: e,
                key: Descriptors.Exceptions
            });
        }        
    }
}