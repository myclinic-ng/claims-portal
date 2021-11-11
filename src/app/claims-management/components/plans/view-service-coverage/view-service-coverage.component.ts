import { Component, OnInit, OnDestroy, Input, OnChanges, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

import { ServerRequestService } from "../../../../shared/services/server-request.service";
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-view-service-coverage',
  templateUrl: './view-service-coverage.component.html',
  styleUrls: ['./view-service-coverage.component.css']
})
export class ViewServiceCoverageComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  dtElement: DataTableDirective;

  @Input() package: any;

  dtOptions: DataTables.Settings = {
    destroy: true
  };
  dtTrigger: Subject<any> = new Subject<any>();

  modal: any;
  services: any = [];
  serviceCategories: any = [];
  selectedCategory: any;
  items: any = [];
  itemList: any = [];
  globalCheck: boolean = false;
  
  constructor(private serverRequest: ServerRequestService, private errorHandler: ErrorHandlerService, 
    private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.loadLinkedServices();
    this.loadServiceCategories();
  }

  loadLinkedServices(): void {
    const packageId = this.package.CategoryID;
    this.serverRequest.get("accounts-biller/patient-type-categories-billing-type-item-link/view-by-category?resourceId="+packageId).subscribe((e)=>{
      this.services = e.contentData; 
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
    this.loadLinkedServices();
  }

  open(content: any) {
    this.modal = this.modalService.open(content);
  }

  loadServiceCategories(): void {
    this.serverRequest.get("accounts-biller/billing-type/view").subscribe((e)=>{
      this.serviceCategories = e.contentData;
      
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }

  loadItems(): void {
    this.serverRequest.get("accounts-biller/billing-type-items/view?resourceId="+this.selectedCategory).subscribe((e)=>{
      this.items = e.contentData; 
      console.log(this.items);
      
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }

  toggleAllChecks(): void {
    setTimeout((e: any)=>{
      this.items.forEach((item: any)=>{
        this.itemList[item.BillingTypeItemID] = this.globalCheck;
      })
    }, 200);
  }

  addServiceCoverage(): void {
    const items: any = [];
    this.itemList.forEach((item: any, key: any)=>{
      if (item){
        items.push(key);
      }
    });

    this.serverRequest.post("accounts-biller/patient-type-categories-billing-type-item-link/new-link", {
      category: this.package.CategoryID,
      billingTypeItem: items
    }).subscribe((e)=>{
      this.toastr.success("Operation successful");
      this.modal.close();
      this.loadLinkedServices();      
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }
}
