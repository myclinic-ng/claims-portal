import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-process-claims',
  templateUrl: './process-claims.component.html',
  styleUrls: ['./process-claims.component.css']
})
export class ProcessClaimsComponent implements OnInit {
  
  @Input() claim: any;

  constructor() { }

  ngOnInit(): void {
  }

}
