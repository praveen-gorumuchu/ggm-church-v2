import { LoginService } from './../../../shared/services/login.service';
import { Component } from '@angular/core';
import { DashboardTitles } from '../../constants/dashboard-title.constant';
import { Router } from '@angular/router';
import { UserInfo, UserRoleEnum } from '../../../shared/models/user-data/uder-list.model';


@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss', '../../dashboard-style.scss']
})
export class StudentsComponent {
  titles = DashboardTitles;
  userRole!: UserRoleEnum;
  userRoleEnum = UserRoleEnum;
  constructor(private router: Router, private loginService: LoginService) {
    this.userRole = this.loginService.loginUser.role;
   
  }



  onRegister() {
    this.router.navigate(['dashboard', 'register-student'])
  }

  ngOnDestroy(): void {


  }
}
