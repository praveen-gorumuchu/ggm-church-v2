import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  
})
export class DashboardComponent {
  sidenavOpened: boolean = true;

  constructor(private router: Router) { }
  
  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  onLogoClick() {
    this.router.navigate(['/home'])
  }

}
