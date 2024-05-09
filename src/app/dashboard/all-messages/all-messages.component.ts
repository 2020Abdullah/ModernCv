import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../Services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all-messages',
  templateUrl: './all-messages.component.html',
  styleUrl: './all-messages.component.css'
})
export class AllMessagesComponent implements OnInit {
  messages: any[] = [];

  searchText: string = '';

  constructor(private crudService: CrudService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
      this.getMessages();
  }

  getMessages(){
    this.spinner.show();
    this.crudService.getData("contactForms").subscribe((res) => {
      this.messages = res;
    })
    this.spinner.hide();
  }

  searchFilter(){
    if(this.searchText !== ''){
      this.messages = this.messages.filter((item) => {
        return item.phone.toLowerCase().includes(this.searchText.toLowerCase());
      })
    }
    else {
      this.getMessages();
    }
  }
}
