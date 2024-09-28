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
    this.getActivateRoute()
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.changeTheme(event.urlAfterRedirects);
      });

  }

  getActivateRoute() {
    this.activeRoute.firstChild?.url.subscribe(urlSegments => {
      const currentPath = urlSegments.map(segment => segment.path).join('/');
      if (currentPath === 'home') {
        this.changeTheme(currentPath);
      }
    });
  }

  // Observe sections for header theme changes
  observeSections(sections: Element[]): void {
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
    sections.forEach((section) => {
      this.observer?.observe(section);
    });
  }

  changeHeaderTheme(entry: any) {
    const header = document.getElementById('app-header') as HTMLElement;
    if (entry.target.classList.contains('bg-dark-header')) {
      this.applyDarkHeader(header);
    } else if (entry.target.classList.contains('bg-light-header')) {
      this.applyLightHeader(header);
    } else if (entry.target.classList.contains('transperant-header')) {
      this.applyTransparentHeader(header);
    }
  }

  // Apply body theme based on the router URL
  private changeTheme(url: string): void {
    this.url = url;
    const body = document.body;
    const ele = document.getElementById('bodySection');
    // Reset any existing body theme
    body.classList.remove('dark', 'light');
    ele?.classList.remove('body-section');

    if (url.includes('home')) {
      body.classList.remove('light');
    } else if (url.includes('bible')) {
      body.classList.add('dark');
      ele?.classList.add('body-section')
    } else {
      body.classList.add('dark');
      ele?.classList.add('body-section')

    }
  }

  // Reset the header theme when needed
  resetHeaderTheme(): void {
    const header = document.getElementById('app-header') as HTMLElement;
    if (header) {
      header.classList.remove('dark-header', 'light-header', 'transperant-bg');
    }
  }

  // Apply dark theme to header
  private applyDarkHeader(ele: HTMLElement): void {
    ele.classList.add('dark-header');
    ele.classList.remove('light-header', 'transperant-bg');
  }

  // Apply light theme to header
  private applyLightHeader(ele: HTMLElement): void {
    ele.classList.add('light-header');
    ele.classList.remove('dark-header', 'transperant-bg');
  }

  // Apply transparent theme to header
  private applyTransparentHeader(ele: HTMLElement): void {
    ele.classList.add('transperant-bg');
    ele.classList.remove('dark-header', 'light-header');
  }
}
