import { Component, OnDestroy, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CrudService } from '../Services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  
  projects: any[] = [];
  services: any[] = [];
  About: any;

  formContact!: FormGroup;

  myObserval = new Subscription;

  year: number = new Date().getFullYear();

  constructor(private crudServise: CrudService, private spinner: NgxSpinnerService){
    this.formContact = new FormGroup({
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
      this.getAllData();
  }

  getAllData(){
    
    this.spinner.show();

    this.myObserval = this.crudServise.getData("myprojects").subscribe((res) => {
      this.projects = res;
    })

    this.myObserval = this.crudServise.getData("myservices").subscribe((res) => {
      this.services = res;
    })

    this.myObserval = this.crudServise.getData("About").subscribe((res) => {
      this.About = res;
    })

    this.spinner.hide();

  }

  slideConfig: OwlOptions = {
    loop: false,
    center:true,
    dots: false,
    items:3,
    margin:10,
    nav: true,
    navText: ['<i class="fa fa-arrow-left"></i>', '<i class="fa fa-arrow-right"></i>'],
    lazyLoad: true,
    merge: false,
    mergeFit: true,
    autoWidth: false,
    startPosition: 1,
    responsive: {
      0: {
      items: 1
      },
      767: {
      items: 2
      },
      1024: {
      items: 3
      }
    }
  };

  closeSidebar(){
    let sidebarMobile = document.querySelector('.menu-mobile');
    sidebarMobile?.classList.remove('show');
    // remove opened modal backdrop
    document.body.removeAttribute("style");
  }

  sendMessage(){
    this.crudServise.storeData("contactForms", {
      name: this.formContact.value.name,
      phone: this.formContact.value.phone,
      email: this.formContact.value.email,
      subject: this.formContact.value.subject,
      message: this.formContact.value.message,
    }).then(() => {
      Swal.fire({
        title: "The Message sented successfully",
        text: "You will be contacted within 24 hours by our team.",
        icon: "success"
      })

      this.formContact.reset();
    }).catch(() => {
      alert("Something went wrong !")
    });
  }

  ngOnDestroy(): void {
      this.myObserval.unsubscribe();
  }


}
