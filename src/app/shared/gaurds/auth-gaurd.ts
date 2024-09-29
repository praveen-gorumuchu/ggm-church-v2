import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    const isAuthenticated = JSON.parse(localStorage.getItem('login') || 'false');

    if (isAuthenticated) {
      this.authService.login();
      return true;
    } else {
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false; // Block navigation
    }
  }
}
