import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from '../Services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  serviceId: string = '';
  serviceName: string = '';
  year: number = new Date().getFullYear();
  orderForm!: FormGroup;

  constructor(private route: ActivatedRoute, private crudService: CrudService, private spinner: NgxSpinnerService){

    this.orderForm = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email)
    })

  }

  ngOnInit(): void {
    this.spinner.show();
    this.route.params.subscribe((param) => {
      this.serviceId = param['id'];
    })

    this.crudService.getdataById("myservices", this.serviceId).then((res) => {
      this.serviceName = res.get('name');
    })

    this.spinner.hide();
  }

  sendOrder(){
    this.crudService.storeData("OrderForms", {
      service_id: this.serviceId,
      name: this.orderForm.value.name,
      phone: this.orderForm.value.phone,
      email: this.orderForm.value.email,
    }).then(() => {
      Swal.fire({
        title: "The service request was completed successfully",
        text: "You will be contacted within 24 hours by our team.",
        icon: "success"
      })

      this.orderForm.reset();

    }).catch(() => {
      alert("Something went wrong !")
    });
  }

}
