import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../Services/auth-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthServiceService){}

  userData!: FormGroup;

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

  SignUp(){
      this.authService.register(this.userData.value.email, this.userData.value.name, this.userData.value.password);
  }
}
