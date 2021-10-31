import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { ServerRequestService } from "../../../shared/services/server-request.service";
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  packages: any = [];
  newPackage: any = {};

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

    this.loadPackages();
  }

  loadPackages(): void {
    this.serverRequest.get("patients/patient-type-category/view").subscribe((e)=>{
      if (this.packages.length < 1){
          this.packages = e.contentData;
          this.dtTrigger.next();
      }
      else {
        this.packages = e.contentData;
      }
      
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }

  open(content: any) {
    this.modal = this.modalService.open(content);
  }

  saveNewPackage(): void {
    this.serverRequest.post("insurance-claims/packages/new-package", this.newPackage).subscribe((e)=>{
      this.toastr.success("New package created", "Operation successful");
      this.modal.close();
      this.loadPackages();
    }, (error)=>{
      this.errorHandler.process(error);
    })

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
