import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderRouteModel, RouteDataModel, ThemeEnumModel } from '../models/routes/route-data.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private observer: IntersectionObserver | undefined;
  url: string = '';

  constructor() { }


  /**
   * @function setHeaderTheme 
   * @description reset header theme and set the header theme for transitions on basis of route data;
   * @param routeData 
   */

  setHeaderTheme(routeData: RouteDataModel) {
    this.resetHeaderTheme();
    const isHeader: boolean = routeData.header && routeData.header.isHeader || false;
    setTimeout(() => {
      const header = document.getElementById('app-header');
      if (isHeader && routeData.header && routeData.header.theme && header) {
        header.classList.add(routeData.header.theme);
      }
    })
    // if (isHeader && routeData.header && routeData.header.transition) {
    //   this.observeSections(routeData.header);
    // }
  }

  /**
 * @function setBodyTheme 
 * @description reset body theme and set the setBodyTheme theme on basis of route data;
 * @param routeData 
 */

  setBodyTheme(routeData: RouteDataModel) {
    this.resetBodyTheme();
    this.resetSectionMargin();
    const body: HTMLElement = document.body as HTMLElement;
    const sectionSpace: HTMLElement = document.getElementById('section-margin-top') as HTMLElement;
    const isBody = routeData && routeData.body || false;
    if (isBody && routeData.body?.theme) {
      body.classList.add(routeData.body?.theme as ThemeEnumModel);
    }
    if (sectionSpace && isBody && !isBody.noMargin) {
      sectionSpace.classList.add('fixed-header-space');
    }
  }

  /**
   * @function observeSections
   * @description observeSections method to change the header theme on basis of each section view
   */

  observeSections(headerData: HeaderRouteModel): void {
    const sections = Array.from(document.querySelectorAll('section'));
    if (!this.observer) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.changeHThemeForSections(entry, headerData);
          }
        });
      },
        { threshold: 0.5 } // Adjust visibility percentage to trigger the change
      );
    }

    // Observe each section
    sections.forEach(section => this.observer?.observe(section));
  }

  /**
   * @private changeHThemeForSections
   * @param {*} entry section entry point
   * @param {HeaderRouteModel} headerData 
   * @memberof ThemeService 
   * @description set the trasistion background for the header on basis of each section view
   */

  changeHThemeForSections(entry: any, headerData: HeaderRouteModel) {
    if (headerData.transition) {
      const header = document.getElementById('app-header') as HTMLElement;
      this.resetHeaderTheme();
      if (entry?.target?.classList?.contains('bg-dark-header')) {
        header.classList.add('transperant-dark-header');
      } else if (entry?.target?.classList?.contains('bg-light-header')) {
        header.classList.add('transperant-light-header');
      } else if (entry?.target?.classList?.contains('transperant-header')) {
        header.classList.add('transperant-bg');
      }
    }
  }

  resetHeaderTheme(): void {
    const header = document.getElementById('app-header') as HTMLElement;
    if (header) {
      this.resetSectionMargin()
      header.classList?.remove('transperant-dark-header', 'transperant-light-header',
        'transperant-bg', 'dark-header', 'light-header', 'dark', 'transperant');
    }
  }

  resetBodyTheme(): void {
    const body = document.body as HTMLElement;
    if (body) {
      body.classList?.remove('dark', 'light');
    }
  }

  /**
   * @function resetSectionMargin
   * @description resetSectionMargin Method to remove the extra sapce when the header was not fixed.
   */

  resetSectionMargin() {
    const ele = document.getElementById('section-margin-top') as HTMLElement;
    if (ele) {
      ele.classList.remove('fixed-header-space');
    }
  }

}
