import { SharedService } from './shared/services/shared.service';
import { AuthService } from './shared/services/auth.service';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { filter, map, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { RouteDataModel } from './shared/models/routes/route-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'ggm-church';
  private sectionElements: Element[] = [];
  subScriptions: Subscription[] = [];
  activatedRoute: any;
  routeData!: RouteDataModel;

  constructor(private authService: AuthService, private themeService: ThemeService,
    private router: Router, private sharedService: SharedService
  ) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    // Unsubscribe from the router event to prevent memory leaks
    this.sharedService.destroy(this.subScriptions);
  }


}
