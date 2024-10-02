import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserInfo } from '../models/user-data/uder-list.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(): boolean {
    const isAuthenticated = JSON.parse(localStorage.getItem('login') || 'false');
    const loginUser: UserInfo = JSON.parse(localStorage.getItem('userInfo') as any);

    if (isAuthenticated && loginUser) {
      this.loginService.setLoginUserInfo(loginUser);
      this.authService.login();
      return true;
    } else {
      this.router.navigate(['/login']); 
      return false;
    }
  }
}
