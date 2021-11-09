import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private toast: ToastrService) { }

  ngOnInit(): void {
  }

  clicked(): void {
  	this.toast.success('I got Clicked');
  }

}
