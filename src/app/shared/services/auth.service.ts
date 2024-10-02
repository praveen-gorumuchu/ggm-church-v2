import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInStatus: boolean = false;

  constructor(private router: Router) {}

 
  login() {
    this.isLoggedInStatus = true;
  }

  logout() {
    this.isLoggedInStatus = false;
    localStorage.removeItem('login');
    localStorage.removeItem('userInfo');
    this.router.navigate(['/login'])

    // localStorage.clear();
  }  

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }
}
