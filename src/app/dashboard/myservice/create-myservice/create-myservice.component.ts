import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CrudService } from '../../../Services/crud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-myservice',
  templateUrl: './create-myservice.component.html',
  styleUrl: './create-myservice.component.css'
})
export class CreateMyserviceComponent {
  title: string = '';
  info: string = '';

  constructor(private spinner: NgxSpinnerService, private crudService: CrudService, private router: Router){}

  addProject(f: any){
    this.spinner.show();
    this.crudService.storeData("myservices", {
      name: f.value.title,
      info: f.value.info,
    }).then( () => {

      this.spinner.hide();

      Swal.fire({
        title: "عملية ناجحة",
        text: "لقد تم إضافة خدمة جديدة إلي قائمة خدماتك",
        icon: 'success'
      });

      this.router.navigate(['/dashboard/myservices'])

    }).catch( (err) => {
      alert('حدث خطأ فادح برجاء الإتصال بالدعم للمساعدة !')
    } );

  }
}
