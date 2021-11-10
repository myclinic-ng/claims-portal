import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { ServerRequestService } from "../../shared/services/server-request.service";
import { ErrorHandlerService } from "../../shared/services/error-handler.service";
import { StorageService } from "../../shared/services/storage.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-global-header',
  templateUrl: './global-header.component.html',
  styleUrls: ['./global-header.component.css']
})
export class GlobalHeaderComponent implements OnInit {
  userId: any;
  currentStaffInfo: any = {};
  businessInfo: any = {};
  constructor(
      private serverRequest: ServerRequestService, 
      private errorHandler: ErrorHandlerService, 
      private storage: StorageService, 
      private router: Router, 
      private toast: ToastrService
    ) {
    this.storage.getItem(environment.userCookieIdentifier).subscribe(data => {
      const userInfo: any = JSON.parse(data);
      if (userInfo.staffid != null){
        this.userId = userInfo.staffid;
      }

      if (userInfo.businessInfo != null){
        this.businessInfo = userInfo.businessInfo
      }
    });
  }

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo(): void {
    const req = this.serverRequest.get("human-resources/staff/view-staff-profile?resourceId="+this.userId);

    req.subscribe((response)=>{
      this.currentStaffInfo = response.contentData[0];
    }, (error)=>{
      this.errorHandler.process(error);
    })  
  }

  logout(): void {
    this.storage.clear()
    this.toast.success('Logout Succeeded')
    setTimeout(
      () => this.router.navigateByUrl('/admin'),
      2000
     )
  }

}
