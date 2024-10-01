import { UserDataList, UserInfo } from '../../../shared/models/user-data/uder-list.model';
import { LoginService } from './../../../shared/services/login.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrl: './dash-header.component.scss'
})
export class DashHeaderComponent implements OnInit, OnChanges, OnDestroy {
  userInfo!: UserInfo;

  constructor(private loginService: LoginService) {

  }
  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    if (this.loginService.loginUser) {
        this.userInfo = this.loginService.loginUser;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnDestroy(): void {

  }
}
