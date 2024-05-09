import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  userData!: FormGroup;
  constructor(private router: Router , private fb:FormBuilder, private authService: AuthServiceService, private spinner: NgxSpinnerService ){}

  ngOnInit(): void {
    this.createForm();  
  }

  createForm(){
    this.userData = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn(){
    this.spinner.show();
    this.authService.Login(this.userData.value.email, this.userData.value.password).then((res) => {
      localStorage.setItem('user', JSON.stringify(res.user))
      this.router.navigate(['/dashboard']);
      this.spinner.hide();
    }).catch((err) => {
      if(err){
        this.spinner.hide();
        alert('البريدالإلكتروني أو كلمة المرور خاطئة !');
      }
    })
  }

}
