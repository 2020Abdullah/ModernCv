import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate {

  constructor(private router: Router) { }

  firebaseAuth = inject(Auth);

  async register(email: string, username: string, password: string)
  {
    return await createUserWithEmailAndPassword(this.firebaseAuth, email, password).then((res) => {
      updateProfile(res.user, {displayName: username})
      localStorage.setItem('user', JSON.stringify(res.user))
    })
  }

  async Login(email: string, password: string){
    return await signInWithEmailAndPassword(this.firebaseAuth, email, password);
  }

  async Logout(){
    return await signOut(this.firebaseAuth);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
      return new Promise(resolve => {
        let checkUser = localStorage.getItem('user');
        if(checkUser){
          resolve(true);
        }
        else {
          this.router.navigate(['/signIn']);
        }
      })
  }

}
