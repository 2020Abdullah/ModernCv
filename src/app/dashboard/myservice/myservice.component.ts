import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CrudService } from '../../Services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-myservice',
  templateUrl: './myservice.component.html',
  styleUrl: './myservice.component.css'
})
export class MyserviceComponent implements OnInit {

  services: any[] = [];

  searchText: string = '';

  servicesObserval = new Subscription();

  constructor(private crudServices: CrudService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.getServices();
  }

  trackByServices(index: any, service:any){
    return service ? index : undefined;
  }

  getServices(){
    this.spinner.show();
    this.servicesObserval = this.crudServices.getData("myservices").subscribe((res) => {
      this.services = res;
    })
    this.spinner.hide();
  }

  searchFilter(){
    if(this.searchText !== ''){
      this.services = this.services.filter((item) => {
        return item.name.toLowerCase().includes(this.searchText.toLowerCase());
      })
    }
    else {
      this.getServices();
    }
  }


}
