import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from "../../../shared/services/auth.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: any = {
    username: '',
    password: ''
  }

  processing: boolean = false;

  constructor(public auth: AuthService, private toastr: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
  }

  performLogin(): void {
    this.processing = true;
    const result = this.auth.authenticate(this.user, (response: any)=>{
      if (typeof response == "undefined" || !response.status){
        this.processing = false;
        this.toastr.warning('Please try again', response.reason);
      }
      else {
        this.toastr.success("You are being redirected to your dashboard", 'Login Successful');
        setTimeout(()=>{
          this.router.navigateByUrl('/admin');
          this.toastr.clear();
        }, 3000);
      }
    }, (error: any)=>{
      this.processing = false;
    });
  }

}
