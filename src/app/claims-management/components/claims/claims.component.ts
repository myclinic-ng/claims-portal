import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  
  viewApprovalRequests: boolean = false;
  selectedClaim: any;

  constructor() { }

  ngOnInit(): void {
  }

  log(x: any): void {
    console.log(x);
  }

  clearSelections(): void {
    this.viewApprovalRequests = false
    this.selectedClaim = null;
    return;
  }

  getSelectedClaim(data: any){
    this.selectedClaim = data;
    console.log(data);
  }

}
