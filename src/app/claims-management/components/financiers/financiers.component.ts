import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';

import { ServerRequestService } from "../../../shared/services/server-request.service";
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-financiers',
  templateUrl: './financiers.component.html',
  styleUrls: ['./financiers.component.css']
})
export class FinanciersComponent implements OnInit {

  financiers: any = [];
  newFinancier: any = {};

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

    this.loadFinanciers();
  }

  loadFinanciers(): void {
    this.serverRequest.get("insurance-claims/financier/view-financiers").subscribe((e)=>{
      if (this.financiers.length < 1){
        this.dtTrigger.next();
        this.financiers = e.contentData;
      }
      else {
        this.financiers = e.contentData;
      }

    }, (error)=>{
      this.errorHandler.process(error);
    })
  }

  open(content: any) {
    this.modal = this.modalService.open(content);
  }

  saveNewFinancier(): void {
    this.serverRequest.post("insurance-claims/financier/new-financier", this.newFinancier).subscribe((e)=>{
      this.toastr.success("New financier registered", "Operation successful");
      this.modal.close();
      this.loadFinanciers();
    }, (error)=>{
      this.errorHandler.process(error);
    })

  }

}
