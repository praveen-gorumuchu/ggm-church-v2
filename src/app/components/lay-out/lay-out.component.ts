import { AppNavService } from './../../shared/services/app-nav.service';
import { SharedService } from './../../shared/services/shared.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { AfterViewInit, Component, HostListener, NgZone, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BibileBookList } from '../../shared/models/bible-books/bible-books.model';
import { BibleService } from '../../shared/services/bible.service';
import { BreakpointService } from '../../shared/services/breakpoint.service';
import { filter, map, Subscription } from 'rxjs';
import { ThemeService } from '../../shared/services/theme.service';
import { RouteDataModel } from '../../shared/models/routes/route-data.model';

@Component({
  selector: 'app-lay-out',
  templateUrl: './lay-out.component.html',
  styleUrls: ['./lay-out.component.scss']
})
export class LayOutComponent implements AfterViewInit, OnInit, OnDestroy, OnChanges {
  currentBook!: BibileBookList;
  @ViewChild('drawer') drawer!: MatDrawer;
  isMobile!: boolean;
  isTablet!: boolean
  isDrawerOpen: boolean = false;
  isToggleClick: boolean = false;
  subscription: Subscription[] = [];
  routeData!: RouteDataModel;
  private observer: IntersectionObserver | undefined;

  constructor(private bibleService: BibleService, private breakpointService: BreakpointService,
    private router: Router, private themeService: ThemeService,
    private activatedRoute: ActivatedRoute, private sharedService: SharedService,
    private zone: NgZone, private appNavService: AppNavService
  ) {
    this.breakpointService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.breakpointService.isTablet$.subscribe(isTablet => {
      this.isTablet = isTablet;
    });
    this.intialSetup();
  }
  
  intialSetup() {
    this.routeData = this.appNavService.getChild(this.activatedRoute).snapshot.data;
    if (this.routeData) {
      this.themeSetup(this.routeData);
    }
  }

  ngOnInit(): void {
    this.getRouteState();
    this.enterFullscreen();
  }

  ngOnChanges(changes: SimpleChanges): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.routeData && this.routeData.header) {
        if (this.routeData.header.isHeader && this.routeData.header.transition) {
          this.observerSections(); 
        }
      }
    });
  }

  getRouteState() {
    this.subscription.push(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.snapshot && route.snapshot.data ? route.snapshot.data : {};
        })
      ).subscribe((data: RouteDataModel) => {
        this.routeData = data;
        this.themeSetup(this.routeData);
      })
    );
  }

  themeSetup(data: RouteDataModel) {
    if (data.header) {
      this.themeService.setHeaderTheme(data);
      if (data.header && data.header.isHeader && data.header.transition) {
        this.observerSections();
      }
    }
    if (data.body) {
      this.themeService.setBodyTheme(data);
    }
  }

  observerSections() {
    const sections = Array.from(document.querySelectorAll('section'));
    if (!sections.length) return;

    if (!this.observer) {
      this.zone.runOutsideAngular(() => {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const isHeader = this.routeData?.header?.isHeader || false;
              if (isHeader && this.routeData.header?.transition) {
                this.zone.run(() => {
                  if (this.routeData && this.routeData.header) {
                    this.themeService.changeHThemeForSections(entry, this.routeData.header);

                  }
                });
              }
            }
          });
        }, { threshold: 0.5 });
      });
    }

    // Observe each section
    sections.forEach(section => this.observer?.observe(section));
  }




  onScroll(event: any) {
    const scrollTop = event.target.scrollTop;
    const header = document.getElementById('app-header');
    if (header) {
      if (scrollTop > 320) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  }

  enterFullscreen(): void {
    const elem = document.documentElement as any;  // The entire page

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, Opera
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE/Edge
      elem.msRequestFullscreen();
    }
  }


  getBibleBook(book: BibileBookList) {
    this.currentBook = book;
    if (this.currentBook) {
      this.drawer.close();
    }
  }

  ngOnDestroy(): void {
    this.routeData = {};
    this.sharedService.destroy(this.subscription);
  }

}
