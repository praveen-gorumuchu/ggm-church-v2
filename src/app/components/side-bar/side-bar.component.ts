import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BibeBookType, BibileBookList, BibleBook, BibleBookTypes } from '../../shared/models/bible-books/bible-books.model';
import { BibleService } from '../../shared/services/bible.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BreakpointService } from '../../shared/services/breakpoint.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { MenuList, MenuListModel } from '../../shared/constants/menu-list';
import { filter } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  bibleBooks!: BibleBookTypes[];
  type = BibeBookType;
  activeMenu!: BibileBookList;
  currentBook!: BibleBook;
  @Output() bibleBook = new EventEmitter<BibileBookList>();
  isMobile: boolean = false;
  isTablet: boolean = false;
  isBible: boolean = false;
  menuList: MenuListModel[] = MenuList;
  isActivatedMenu!: MenuListModel;

  constructor(private bibleService: BibleService, private sanitizer: DomSanitizer,
    private breakpointService: BreakpointService, private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.breakpointService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.breakpointService.isTablet$.subscribe(isTablet => {
      this.isTablet = isTablet;
    });
    this.getActivateRoute();
  }

  ngOnInit(): void {
    this.getBibleBooks();
    this.findActivatedMenu();
  }


  onClickBook(book: BibileBookList, data: BibleBookTypes) {
    
    this.bibleService.resetDeafualts();
    this.bibleService.getBook(book.id);
    this.activeMenu = book;
    this.bibleBook.emit(book);
    this.bibleService.setChapterIndex(1);
    this.bibleService.setBibleState({
      showBook: true,
      showChapter: false,
      showVerses: false
    })
  }

  findActivatedMenu() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Check the active route path
      this.getActivateRoute();
    })
    const activatedMenu: MenuListModel = this.menuList.find((menu: MenuListModel) =>
      this.router.url.includes(menu.url)) as MenuListModel;
    this.isActivatedMenu = activatedMenu;

  }

  getActivateRoute() {
    this.activeRoute.firstChild?.url.subscribe(urlSegments => {
      const currentPath = urlSegments.map(segment => segment.path).join('/');
      this.isBible = currentPath === 'bible';
    });
  }

  isActive(book: BibileBookList): boolean {
    return this.activeMenu.id === book.id
    // return this.activeMenu.name === book.name;
  }

  onMenuClick(menu: MenuListModel) {
    this.isActivatedMenu = menu;
    this.router.navigate(['/', menu.url]);
  }

  isActiveMenu(menu: MenuListModel) {
    this.isActivatedMenu.name === menu.name;
  }


  getBibleBooks() {
    this.bibleService.bibleBooksObsCast.subscribe((data: BibleBookTypes[]) => {
      if (data.length > 0) {
        this.bibleBooks = data;
        this.activeMenu = this.bibleBooks[0].books[0]
      }
    })
  }
}
