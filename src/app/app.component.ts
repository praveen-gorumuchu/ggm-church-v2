import { SharedService } from './shared/services/shared.service';
import { AuthService } from './shared/services/auth.service';
import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'ggm-church';
  private sectionElements: Element[] = [];
  subScriptions: Subscription[] = [];

  constructor(private authService: AuthService, private themeService: ThemeService,
    private router: Router, private sharedService: SharedService
  ) { }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
  ngAfterViewInit(): void {
    // Observe sections for the first time
    this.observeSections();

    // Listen for route changes and observe sections again after navigation
    this.subScriptions.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.routeDataHasTransition().then((hasTransition) => {
            if (hasTransition) {
              this.observeSections();  // Only observe sections if transition is true
            }
          });
        }
      }))
  }

  observeSections(): void {
    // Get all sections with class 'section' after DOM is fully rendered
    this.sectionElements = Array.from(document.querySelectorAll('.section'));

    // Start observing the sections for theme changes
    if (this.sectionElements.length) {
      this.themeService.observeSections(this.sectionElements);
    }
  }

  async routeDataHasTransition(): Promise<boolean> {
    const routeData = await this.router.routerState.root.firstChild?.data.toPromise();
    return routeData ? routeData['transition'] === true : false;
  }


  ngOnDestroy(): void {
    // Unsubscribe from the router event to prevent memory leaks
    this.sharedService.destroy(this.subScriptions);
  }


}
