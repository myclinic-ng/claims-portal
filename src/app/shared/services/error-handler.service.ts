import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private toastr: ToastrService) {
  }

  process(errorObject: any): void{
    switch(errorObject.status){
      case 404:{
        this.toastr.warning('Invalid Resource Requested', 'The requested resource was not found on this server, please contact an administrator if this error persists');
        break;
      }
      case 500:
      case 501:
      case 400:{
        if (errorObject.errorMessage != "A server error has occurred. Unable to connect to database"){
          this.toastr.error('This is usually due to making request for a missing resource or sending improperly formatted data to the server. Please contact an administrator if this error persists. Error Code: AB0'+errorObject.status+' Server Message: '+errorObject.errorMessage, 'Unable To Process Request');
        }
        break;
      }
      case 503:{
        this.toastr.warning('This is usally due to the creation of duplicate data. This resource does not allow you to create data of the same exact type, please contact an administrator if this error persists. Error Code: AB0'+errorObject.status, 'The Server Refused To Process Your Request');
        break;
      }
      case 401:{
        this.toastr.info("You need to sign in to an account with proper authorization to continue", "Request Denied");
        break;
      }
      case 402:{
        this.toastr.error("Billing Error", 'Unable to complete your request due to a billing issue associated with this account. Please contact an administrator. Error Code: AB0'+errorObject.status+' Server Message: '+errorObject.errorMessage);
        break;
      }
      default:
      {
        if (typeof errorObject != "undefined" && errorObject != null){
          if (errorObject.status == -1 || errorObject.status == 0){
            this.toastr.warning("Please check your network connectivity to confirm the server is still accessible from this computer. Contact an administrator if this error persists. Error Code: AB0"+errorObject.status, 'Unable to reach server');
          }
          else {
            this.toastr.error("A general error has occurred, please contact an administrator","Unknown error");
          }
        }
        else{
          this.toastr.error("Unknown error", "A general error has occurred, please contact an administrator");
        }
      }
    }
  }
}
