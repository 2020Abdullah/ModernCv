import { Component, OnDestroy, OnInit } from '@angular/core';
import { CrudService } from '../../Services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mywork',
  templateUrl: './mywork.component.html',
  styleUrl: './mywork.component.css',
})
export class MyworkComponent implements OnInit, OnDestroy {

  works: any[] = [];

  searchText: any;

  worksObserval = new Subscription();

  trackByworks(index: any, work:any){
    return work ? index : undefined
  }

  constructor(private crudService: CrudService, private spinner: NgxSpinnerService){}

  ngOnInit(): void {
      this.getworks();
  }

  getworks(){
    this.spinner.show();
    this.worksObserval = this.crudService.getData("myprojects").subscribe((res) => {
      this.works = res;
      this.spinner.hide();
    })
  }

  deleteProject(id: string){
    Swal.fire({
      title: "هل تريد حذف هذا المشروع بالفعل ؟",
      text: "سيتم حذف كل شئ مرتبط بهذا المشروع",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.crudService.deleteData("myprojects", id).then(() => {
          Swal.fire({
            title: "تم الحذف بنجاح",
            text: "لقد تم حذف المشروع بنجاح",
            icon: "success"
          });
        }).catch((err) => {
          alert('حدث خطأ ما برجاء الإتصال بالدعم للمساعدة ...')
        })
      }
    });
  }

  searchFilter(){
    if(this.searchText !== ''){
      this.works = this.works.filter((item) => {
        return item.name.toLowerCase().includes(this.searchText.toLowerCase());
      })
    }
    else {
      this.getworks();
    }
  }

  ngOnDestroy(): void {
      this.worksObserval.unsubscribe();
  }
}
