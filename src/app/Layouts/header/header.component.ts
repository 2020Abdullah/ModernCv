import { Component } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private AuthService: AuthServiceService){}

  logout(){
    localStorage.clear();
    this.AuthService.Logout();
    this.router.navigate(['/signIn'])
  }
}
