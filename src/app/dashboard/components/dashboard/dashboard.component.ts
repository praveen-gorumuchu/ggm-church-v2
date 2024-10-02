import { BreakpointService } from './../../../shared/services/breakpoint.service';
import { AppNavService } from './../../../shared/services/app-nav.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, Subscription, switchMap } from 'rxjs';
import { RouteDataModel } from '../../../shared/models/routes/route-data.model';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  
})
export class DashboardComponent implements OnInit {
  sidenavOpened: boolean = true;
  subscription: Subscription[] = [];
  modeType: MatDrawerMode = 'side';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, 
    private appNavService: AppNavService, private breakpointService: BreakpointService) {
    // this.activatedRoute = this.appNavService.getChild(this.activatedRoute);
    this.subscription.push(
      this.breakpointService.isMobile$.subscribe((flag: boolean) => {
        if(flag) this.modeType = 'over'
      }),
      // this.breakpointService.isTablet$.subscribe((flag: boolean) => {
      //   if(flag) this.modeType ='over';
      // })
    )
   }

   ngOnInit(): void {
      this.getRouteData();
   }

   getRouteData() {
    this.subscription.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        switchMap(() => this.activatedRoute.data) 
      ).subscribe(data => {

        this.handleRouteData(data);
      })
    );
    // Handle route data on page load or refresh (without router.events)
    this.subscription.push(
      this.activatedRoute.data.subscribe(data => {
        const routeData = this.appNavService.getChild(this.activatedRoute);

        this.handleRouteData(data);
      })
    );

   }

   handleRouteData(data:RouteDataModel) {

   }
  
  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  onLogoClick() {
    this.router.navigate(['/home'])
  }

}
