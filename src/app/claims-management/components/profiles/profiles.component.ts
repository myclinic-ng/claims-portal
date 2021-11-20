import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { ServerRequestService } from "../../../shared/services/server-request.service";
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {
  modal: any = '';
  subscriptions: any = [];
  providers: any = [];

  selectedSubscription: any = {};

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
    this.loadProviders();
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

  open(content: any) {
    this.modal = this.modalService.open(content);
  }

  loadProviders(): void {
    this.serverRequest.get("human-resources/staff-profile/view-all-staffs").subscribe((e)=>{
      if (this.providers.length < 1){
          this.providers = e.contentData;
          this.dtTrigger.next();
      }
      else {
        this.providers = e.contentData;
      }
      
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }

}
