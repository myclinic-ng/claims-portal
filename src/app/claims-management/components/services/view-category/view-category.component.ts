import { Component, OnInit, OnDestroy, Input, OnChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { ServerRequestService } from "../../../../shared/services/server-request.service";
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  @Input() category: any;

  categoryId: any = 0;

  dtOptions: DataTables.Settings = {
    destroy: true
  };
  dtTrigger: Subject<any> = new Subject<any>();

  items: any = [];
  modal: any;
  newItem: any = {};

  constructor(private serverRequest: ServerRequestService, private errorHandler: ErrorHandlerService, 
    private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.categoryId = this.category.BillingTypeID;
    this.serverRequest.get("accounts-biller/billing-type-items/view?resourceId="+this.categoryId).subscribe((e)=>{
      this.items = e.contentData; 
      this.rerender();
      
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }

  rerender(): void {
    if (typeof this.dtElement.dtInstance !== "undefined"){
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
    else {
      this.dtTrigger.next();
    }
  }

  ngOnChanges(): void {
    this.loadItems();
  }

  open(content: any) {
    this.modal = this.modalService.open(content);
  }

  saveNewItem(): void {
    this.newItem.billingType = this.categoryId;
    this.serverRequest.post("accounts-biller/billing-type-items/new", this.newItem).subscribe((e)=>{
      this.toastr.success("New item registered", "Operation successful");
      this.modal.close();
      this.loadItems();
    }, (error)=>{
      this.errorHandler.process(error);
    })

  }

}
