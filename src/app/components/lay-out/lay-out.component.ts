import { NavigationEnd, Router } from '@angular/router';

import { AfterViewInit, Component, HostListener, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { BibileBookList } from '../../shared/models/bible-books/bible-books.model';
import { BibleService } from '../../shared/services/bible.service';
import { BreakpointService } from '../../shared/services/breakpoint.service';
import { filter, Subscription } from 'rxjs';
import { ThemeService } from '../../shared/services/theme.service';

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

  constructor(private bibleService: BibleService, private breakpointService: BreakpointService,
    private router: Router, private renderer: Renderer2, private themeService: ThemeService
  ) {
    this.breakpointService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });
    this.breakpointService.isTablet$.subscribe(isTablet => {
      this.isTablet = isTablet;
    });
  }


  ngAfterViewInit(): void {
    this.themeService.observeSections();
  }


  ngOnInit(): void {
    this.enterFullscreen();
  }

  ngOnChanges(changes: SimpleChanges): void { }

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

  }

}
