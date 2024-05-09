import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrudService } from '../../Services/crud.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-all-order',
  templateUrl: './all-order.component.html',
  styleUrl: './all-order.component.css'
})
export class AllOrderComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  searchText: string = '';
  myObserval = new Subscription;
  constructor(private crudService: CrudService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
     this.getOrders();
  }

  getOrders(){
    this.spinner.show();
    this.myObserval = this.crudService.getData("OrderForms").subscribe((res) => {
      this.orders = res;
    })

    this.spinner.hide();
  }

  searchFilter(){
    if(this.searchText !== ''){
      this.orders = this.orders.filter((item) => {
        return item.name.toLowerCase().includes(this.searchText.toLowerCase());
      })
    }
    else {
      this.getOrders();
    }
  }

  ngOnDestroy(): void {
      this.myObserval.unsubscribe();
  }
}
