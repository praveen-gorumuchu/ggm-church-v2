import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private observer: IntersectionObserver | undefined;
  url: string = '';

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    // Observe route changes to apply the body theme
    this.observeRouteChanges();
  }

  // Observe sections for header theme changes
  observeSections(): void {
    const sections = Array.from(document.querySelectorAll('section'));  // Get all sections with class 'section'

    if (!this.observer) {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.changeHeaderTheme(entry);
            }
          });
        },
        { threshold: 0.5 } // Adjust visibility percentage to trigger the change
      );
    }

    // Observe each section
    sections.forEach(section => this.observer?.observe(section));
  }

  // Method to listen to route changes
  private observeRouteChanges(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.url = event.urlAfterRedirects;  // Capture the final URL after redirection
        this.applyRouteSpecificTheme();
      });
  }

  // Apply body and header theme based on the current route URL and data
  private applyRouteSpecificTheme(): void {
    const body = document.body;
    const ele = document.getElementById('bodySection');
    const routeData = this.activeRoute.snapshot.firstChild?.data;  // Capture the route's data

    // Reset any existing body theme
    body.classList.remove('dark', 'light');
    ele?.classList.remove('body-section');

    // Check the URL and apply corresponding body theme
    if (this.url.includes('home') || this.url.includes('login')) {
      body.classList.remove('light');
    } else if (this.url.includes('bible')) {
      body.classList.add('dark');
      ele?.classList.add('body-section');
    } else {
      body.classList.add('dark');
      ele?.classList.add('body-section');
    }

    // Apply header class if it's provided in route data
    const header = document.getElementById('app-header') as HTMLElement;
    this.resetHeaderTheme();
    if (routeData?.['headerClass']) {
      header.classList.add(routeData['headerClass']);
    }
  }

  // Reset the header theme when needed
  resetHeaderTheme(): void {
    const header = document.getElementById('app-header') as HTMLElement;
    if (header) {
      header.classList.remove('transperant-dark-header', 'transperant-light-header',
        'transperant-bg', 'dark-header');
    }
  }

  // Apply dark theme to header
  private applyDarkHeader(ele: HTMLElement): void {
    ele.classList.add('transperant-dark-header');
    ele.classList.remove('transperant-light-header', 'transperant-bg', 'dark-header');
  }

  // Apply light theme to header
  private applyLightHeader(ele: HTMLElement): void {
    ele.classList.add('transperant-light-header');
    ele.classList.remove('transperant-dark-header', 'transperant-bg', 'dark-header');
  }

  // Apply transparent theme to header
  private applyTransparentHeader(ele: HTMLElement): void {
    ele.classList.add('transperant-bg');
    ele.classList.remove('transperant-dark-header', 'transperant-light-header', 'dark-header');
  }

  // Apply header theme based on section observation
  private changeHeaderTheme(entry: any) {
    const routeData = this.activeRoute.snapshot.firstChild?.data;
    const header = document.getElementById('app-header') as HTMLElement;
    if(routeData && routeData['transition']) {
      if (entry.target.classList.contains('bg-dark-header')) {
        this.applyDarkHeader(header);
      } else if (entry.target.classList.contains('bg-light-header')) {
        this.applyLightHeader(header);
      } else if (entry.target.classList.contains('transperant-header')) {
        this.applyTransparentHeader(header);
      }
    }
  
  }
}
