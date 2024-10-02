import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ButtonConstant } from '../../../shared/constants/button-name.constant';
import { RouteDataModel } from '../../../shared/models/routes/route-data.model';
import { UserDataList, UserInfo } from '../../../shared/models/user-data/uder-list.model';
import { AppNavService } from '../../../shared/services/app-nav.service';
import { LoginService } from './../../../shared/services/login.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ThemeService } from '../../../shared/services/theme.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dash-header',
  templateUrl: './dash-header.component.html',
  styleUrl: './dash-header.component.scss'
})
export class DashHeaderComponent implements OnInit, OnChanges, OnDestroy {
  userInfo!: UserInfo;
  btnConst = ButtonConstant;

  constructor(private loginService: LoginService, private appNavService: AppNavService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    const routeData: RouteDataModel =
      this.appNavService.getChild(this.activeRoute)?.snapshot?.data;
    this.initalSetup(routeData);
  }

  ngOnInit(): void {
    this.getUserData();
  }

  initalSetup(routeData: RouteDataModel) {
    // this.themeService.setHeaderTheme(routeData);
    this.resetInital();


  }


  getRouter() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const routeData: RouteDataModel = this.appNavService.getChild(this.activeRoute).snapshot.data;
      this.initalSetup(routeData);
    })
  }

  resetInital() {
 
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
