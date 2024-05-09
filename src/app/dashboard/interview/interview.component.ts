import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  } from '@angular/fire/firestore';
import { CrudService } from '../../Services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrl: './interview.component.css'
})
export class InterviewComponent implements OnInit, OnDestroy {

  userData!: FormGroup;

  id: string = '';
  title: string = '';
  answer: string = '';

  Quetions: any[] = [];

  QuetionsObservable: Subscription = new Subscription;

  constructor(private fb: FormBuilder, private crudService: CrudService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
    this.spinner.show();
    // get data 
    this.QuetionsObservable = this.crudService.getData('Interview').subscribe((val) => {
      this.Quetions = val;
      this.spinner.hide();
    })

    // fill form model 
    this.userData = this.fb.group({
      title: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  hideModel(){
    // close model create
    let QModel = document.querySelectorAll('.modal');
    QModel.forEach((e) => {
      e.classList.remove('show');
      e.setAttribute('aria-hidden', 'true');
      e.setAttribute('style', 'display: none');
    })
    // get modal backdrop
    const modalBackdrops = document.getElementsByClassName('modal-backdrop');
    // remove opened modal backdrop
    document.body.removeChild(modalBackdrops[0]);
  }

  ExpandedAll(){
    let Allpanel = document.querySelectorAll('.Quetion-answer');
    Allpanel.forEach((e) => {
      e.classList.toggle('show');
    })
  }
  createQuetion(){
    this.spinner.show();
    this.crudService.storeData('Interview', {
      title: this.userData.value.title,
      answer: this.userData.value.answer,
    }).then(() => {

      this.spinner.hide();

      this.userData.value.title = '';
      this.userData.value.answer = '';

      this.hideModel();

      Swal.fire({
        title: "عملية ناجحة",
        text: "تم إضافة 1 من البيانات بنجاح",
        icon: "success"
      });

    }).catch((err) => {
      console.log(err)
    })
  }

  openUpdateQuetion(id: string, title: string, answer: string){
    this.id = id;
    this.title = title;
    this.answer = answer;
  }

  updateQuetion(f: any){
    this.crudService.updateData('Interview', this.id, f.value).then( () => {
      this.hideModel();
      Swal.fire({
        title: "عملية ناجحة",
        text: "تم تحديث 1 من البيانات بنجاح",
        icon: "success"
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  deleteQuetion(id: string, event: any){
    event.preventDefault();
    Swal.fire({
      title: "هل انت متأكد من هذا السؤال ؟",
      text: "سيتم حذف إجابة السؤال أيضاً",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "نعم, أريد ذلك !"
    }).then((result) => {
      if (result.isConfirmed) {
        this.crudService.deleteData('Interview', id).then(() => {
          Swal.fire({
            title: "عملية ناجحة",
            text: "تم حذف السؤال بنجاح",
            icon: "success"
          });
        })
      }
    });
  }
  ngOnDestroy(): void {
    this.QuetionsObservable.unsubscribe();
  }
}
