import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInStatus: boolean = false;

  constructor() {}

 
  login() {
    this.isLoggedInStatus = true;
  }

  logout() {
    this.isLoggedInStatus = false;
    localStorage.removeItem('login');
  }  

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }
}
