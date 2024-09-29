import { ThemeService } from './../../shared/services/theme.service';
import { AppNavService } from './../../shared/services/app-nav.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from './../../shared/services/shared.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BibleService } from '../../shared/services/bible.service';
import { BibleBook, ChapterList } from '../../shared/models/bible-books/bible-books.model';
import { filter, Subscription } from 'rxjs';
import { MenuList, MenuListModel } from '../../shared/constants/menu-list';
import { BibleStateModel } from '../../shared/models/bible.state.model';
import { BreakpointService } from '../../shared/services/breakpoint.service';
import { RouteDataModel } from '../../shared/models/routes/route-data.model';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toggleDrawer = new EventEmitter<void>();
  currentBook!: BibleBook;
  currentChapter!: ChapterList;
  currentChapterIndex = 1;
  subscription: Subscription[] = [];
  menuList: MenuListModel[] = [];
  activeMenu!: MenuListModel;
  bibleState!: BibleStateModel;
  showChapterIndex = false;
  showVerses = false;
  isMobile: boolean = false;
  isTablet: boolean = false;
  hideGlobalNav: boolean = false;
  headerTitle: boolean = false;
  menuIcon: boolean = false;

  constructor(private bibleService: BibleService, private sharedService: SharedService,
    private router: Router, private breakpointService: BreakpointService,
    private activeRoute: ActivatedRoute, private appNavService: AppNavService, 
    private themeService: ThemeService) {
    this.breakpointService.isMobile$.subscribe(isMobile => {
      this.isMobile = isMobile;
    });

    this.breakpointService.isTablet$.subscribe(isTablet => {
      this.isTablet = isTablet;
    });
    const routeData: RouteDataModel =
      this.appNavService.getChild(this.activeRoute)?.snapshot?.data;
    this.initalSetup(routeData);
  }

  ngOnInit(): void {
    this.getBibleBooks();
    this.getRouter();
    this.menuList = MenuList;
    this.activeMenu = this.menuList[0];
  }

  initalSetup(routeData: RouteDataModel) {
    this.themeService.setHeaderTheme(routeData);
    this.resetInital();
    const isHeader = routeData.header && routeData.header.isHeader || false;
    if (isHeader && routeData.header && routeData.header.hideGlobalNav) {
      this.hideGlobalNav = routeData.header.hideGlobalNav;
    } else this.hideGlobalNav = false;
    if(isHeader && routeData.header && routeData.header.headerTitle) {
      this.headerTitle = routeData.header && routeData.header.headerTitle || false;
    } else this.headerTitle = false;
    if(isHeader && routeData.header && routeData.header.menuIcon) {
      this.menuIcon = routeData.header.menuIcon
    } else this.menuIcon = false;

  }

  resetInital() {
    this.headerTitle = false;
    this.menuIcon = false;
    this.hideGlobalNav = false;
  }


  getRouter() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const routeData: RouteDataModel = this.appNavService.getChild(this.activeRoute).snapshot.data;
      this.initalSetup(routeData);
    })
  }

  isActiveMenu(book: MenuListModel): boolean {
    return this.activeMenu.name === book.name
  }

  onMenuClick(menu: MenuListModel) {
    this.router.navigate(['/', menu.url])
    this.activeMenu = menu;
  }

  onLogoClick() {
    this.router.navigate(['/', 'home']);
    this.activeMenu = this.menuList[0];
    this.bibleService.resetDeafualts();
  }

  resetDefaults() {
    this.bibleService.setChapterIndex(1);
    this.bibleService.setChapterIndex(1);
  }

  getBibleBooks() {
    this.subscription.push(
      this.bibleService.currentBookObsCast.subscribe((data: BibleBook) => {
        this.currentBook = data;
        this.currentChapter = this.currentBook.chapters[0];
        console.log(this.currentBook);
      }),
      this.bibleService.chapterIndexObsCast.subscribe((index: number) => {
        this.currentChapterIndex = index;
      }),
      this.bibleService.isShowObasCast.subscribe((data: BibleStateModel) => {
        this.bibleState = data;
        this.showChapterIndex = this.bibleState.showChapter || false;
        this.showVerses = this.bibleState.showVerses || false;
      })
    )


  }

  ngOnDestroy(): void {
    this.showChapterIndex = false;
    this.showVerses = false;
    this.isMobile = false;
    this.isTablet = false;
    this.resetInital();
  }

}
