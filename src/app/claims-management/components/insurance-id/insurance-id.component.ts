import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { ServerRequestService } from "../../../shared/services/server-request.service";
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-insurance-id',
  templateUrl: './insurance-id.component.html',
  styleUrls: ['./insurance-id.component.css']
})
export class InsuranceIdComponent implements OnInit {

  subscriptions: any = [];
  financiers: any = [];
  packages: any = [];

  newSubscription: any = {};

  modal: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private serverRequest: ServerRequestService, private errorHandler: ErrorHandlerService, 
    private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    }

    this.loadSubscriptions();
    this.loadFinanciers();
    this.loadPackages();

    this.dtTrigger.next();
  }

  loadSubscriptions(): void {
    this.serverRequest.get("insurance-claims/financier/view-insurance-id").subscribe((e)=>{
      if (this.subscriptions.length < 1){
          this.subscriptions = e.contentData;
          this.dtTrigger.next();
      }
      else {
        this.subscriptions = e.contentData;
      }
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }

  loadFinanciers(): void {
    this.serverRequest.get("insurance-claims/financier/view-financiers").subscribe((e)=>{
      this.financiers = e.contentData;
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }

  loadPackages(): void {
    this.serverRequest.get("patients/patient-type-category/view").subscribe((e)=>{
      this.packages = e.contentData;
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }


  open(content: any) {
    this.modal = this.modalService.open(content);
  }

  saveNewSubscription(): void {
    this.serverRequest.post("insurance-claims/financier/new-insurance-id", this.newSubscription).subscribe((e)=>{
      this.toastr.success("New subscription started", "Operation successful");
      this.modal.close();
      this.loadSubscriptions();
    }, (error)=>{
      this.errorHandler.process(error);
    })

  }

}
