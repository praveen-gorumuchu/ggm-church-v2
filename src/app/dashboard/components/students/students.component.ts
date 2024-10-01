import { Component } from '@angular/core';
import { DashboardTitles } from '../../constants/dashboard-title.constant';
import { Router } from '@angular/router';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss', '../../dashboard-style.scss']
})
export class StudentsComponent {
  titles = DashboardTitles;

  constructor(private router: Router) {

  }



  onRegister() {
    this.router.navigate(['dashboard', 'register-student'])
  }

  ngOnDestroy(): void {


  }
}
