import { Component } from '@angular/core';
import { StorageModule } from "@angular/fire/storage";
import { CrudService } from '../../../Services/crud.service';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-work',
  templateUrl: './create-work.component.html',
  styleUrl: './create-work.component.css'
})
export class CreateWorkComponent {
  title: string = '';
  info: string = '';
  imageUrl: any;
  videoUrl: any;

  constructor(private crudService: CrudService, private spinner: NgxSpinnerService, private router: Router){}

  addProject(f: any){
    this.spinner.show();
    this.crudService.storeData("myprojects", {
      name: f.value.title,
      info: f.value.info,
      imageUrl: f.value.imageUrl,
      videoUrl: f.value.videoUrl,
    }).then( () => {

      this.spinner.hide();

      Swal.fire({
        title: "عملية ناجحة",
        text: "لقد تم إضافة مشروع جديد بنجاح",
        icon: 'success'
      });

      this.router.navigate(['/dashboard/mywork'])

    }).catch( (err) => {
      alert('حدث خطأ فادح برجاء الإتصال بالدعم للمساعدة !')
    } );




  }
}
