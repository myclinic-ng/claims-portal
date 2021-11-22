import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-approval-requests',
  templateUrl: './approval-requests.component.html',
  styleUrls: ['./approval-requests.component.css']
})
export class ApprovalRequestsComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  @Output() selectedClaimOutput = new EventEmitter<any>();

  selectedClaim: any;

  claims: any = [
    {'id': 123, 'provider': 'Blue Blah HealthCare', 'package': 'Gold', 'time': '22-11-21:11:10'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

  setSelectedClaim() {
    this.selectedClaimOutput.emit(this.selectedClaim);
  }


}
