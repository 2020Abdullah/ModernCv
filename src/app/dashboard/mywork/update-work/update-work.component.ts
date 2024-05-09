import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from '../../../Services/crud.service';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-work',
  templateUrl: './update-work.component.html',
  styleUrl: './update-work.component.css'
})
export class UpdateWorkComponent implements OnInit {
  projectId: string = '';

  name: string = '';
  info: string = '';
  imageUrl: string = '';
  videoUrl: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private crundService: CrudService, private spinner: NgxSpinnerService){}


  ngOnInit(): void {
      this.route.params.subscribe((params) => {
        this.projectId = params['id'];
      })

      this.spinner.show();

      this.crundService.getdataById("myprojects", this.projectId).then((res) => {
        this.name = res.get('name');
        this.info = res.get('info');
        this.imageUrl = res.get('imageUrl');
        this.videoUrl = res.get('videoUrl');
        this.spinner.hide();
      }).catch((err) => {
        console.log(err)
      })

  }

  updateProject(f: any){
    console.log(f.value);
    this.spinner.show();
    this.crundService.updateData("myprojects", this.projectId, {
      name: f.value.title,
      info: f.value.info,
      imageUrl: f.value.imageUrl,
      videoUrl: f.value.videoUrl
    }).then(() => {
      this.spinner.hide();

      Swal.fire({
        title: "عملية ناجحة",
        text: "لقد تم تحديث معلومات المشروع بنجاح",
        icon: 'success'
      });

      this.router.navigate(['/dashboard/mywork'])

    }).catch(err => {
      console.log(err)
    })
  }
}
