import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { ServerRequestService } from "../../../shared/services/server-request.service";
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {
  providers: any = [];
  newProvider: any = {};

  modal: any;

  selectedProvider: any;
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private serverRequest: ServerRequestService, private errorHandler: ErrorHandlerService, 
    private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    }

    this.loadProviders();
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

  open(content: any) {
    this.modal = this.modalService.open(content);
  }

  saveNewProvider(): void {
    let providerDetails = {
      "First Name": this.newProvider.providerName,
      "Last Name": "",
      "staffName": this.newProvider.providerName,
      "State": this.newProvider["State"],
      "LGA": this.newProvider["LGA"],
      "Address": this.newProvider["Address"],
      "staffId":0
    };

    let providerAccount = {
      department: {
        departmentId: 2004
      },
      role: {
        roleId: 30
      },
      staff: {
        username: this.newProvider.providerUsername,
        password: this.newProvider.providerPassword
      }
    };

    this.serverRequest.post("human-resources/staff/new-staff-with-department-and-role", providerAccount).subscribe((e)=>{
      providerDetails.staffId = e.contentData.lastInsertId;
      this.serverRequest.post("human-resources/staff-profile/new", providerDetails).subscribe((e)=>{
        this.toastr.success("New provider created", "Operation successful");
        this.modal.close();
        this.loadProviders();
      })
    }, (error)=>{
      this.errorHandler.process(error);
    })

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
