import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { ServerRequestService } from "../../../shared/services/server-request.service";
import { ErrorHandlerService } from '../../../shared/services/error-handler.service';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  modal: any;

  newCategory: any = {};

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  categories: any = [];
  selectedCategory: any;
  constructor(private serverRequest: ServerRequestService, private errorHandler: ErrorHandlerService, 
    private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    }

    this.loadCategories();
  }

  loadCategories(): void {
    this.serverRequest.get("accounts-biller/billing-type/view").subscribe((e)=>{
      if (this.categories.length < 1){
          this.categories = e.contentData;
          this.dtTrigger.next();
      }
      else {
        this.categories = e.contentData;
      }
      
    }, (error)=>{
      this.errorHandler.process(error);
    })
  }

  open(content: any) {
    console.log("called");
    this.modal = this.modalService.open(content);
  }

  saveNewCategory(): void {
    this.serverRequest.post("accounts-biller/billing-type/new", this.newCategory).subscribe((e)=>{
      this.toastr.success("New service category registered", "Operation successful");
      this.modal.close();
      this.loadCategories();
    }, (error)=>{
      this.errorHandler.process(error);
    })

  }
}
