import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subject } from 'rxjs';

import { ServerRequestService } from "../../../../shared/services/server-request.service";
import { ErrorHandlerService } from '../../../../shared/services/error-handler.service';
import { EventsService } from '../../../../shared/services/events.service';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-profile',
  templateUrl: './new-profile.component.html',
  styleUrls: ['./new-profile.component.css']
})
export class NewProfileComponent implements OnInit {
  @Input() subscription: any;

  newProfile: any = {
    patientType: 0
  };

  constructor(private serverRequest: ServerRequestService, private errorHandler: ErrorHandlerService, 
    private modalService: NgbModal, private toastr: ToastrService, private events: EventsService) { }

  ngOnInit(): void {
  }


  saveNewProfile(): void {
    this.newProfile.patientName = this.newProfile['First Name']+ ' '+this.newProfile['Last Name'];

    this.serverRequest.post("patients/patient/new", this.newProfile).subscribe((e)=>{
      if (typeof e.contentData.lastInsertId !== "undefined"){
        this.toastr.success("New profile registered successfully", "Operation successful");
        this.newProfile = {};
        this.events.broadcast('reload-profiles', true);
      }
      else {
        this.toastr.warning("Unable to register new profile", "An error occurred");
      }
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }

  ngOnChanges(e: any) {
   this.newProfile.patientType = this.subscription.PatientTypeID
  }

}
