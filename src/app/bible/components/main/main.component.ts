import { DrawerService } from './../../../shared/services/drawer.service';

import { SharedService } from './../../../shared/services/shared.service';
import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { BibeBookType, BibleBook, ChapterList, VerseModel } from '../../../shared/models/bible-books/bible-books.model';
import { BibleService } from '../../../shared/services/bible.service';
import { StringConstant } from '../../../shared/constants/string-constant';
import { QuickAccessActions } from '../../../shared/models/bible-books/quick-access.model';
import { ZoomService } from '../../../shared/services/zoom.service';
import { KeyboardShortcutsService } from '../../../shared/services/key-board-shortcut.service';
import { BookMarkService } from '../../../shared/services/bookmark.service';
import { BreakpointService } from '../../../shared/services/breakpoint.service';
import { EndPointUrlConst } from '../../../shared/constants/end-point-url.constant';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy, AfterViewInit {
  currentBook!: BibleBook;
  type = BibeBookType;
  currentChapterIndex = 1;
  currentChapter!: ChapterList;
  subscriptions: Subscription[] = [];
  isLoading: boolean;
  isMobile: boolean = false;
  currentVerse: number = 1;

  @ViewChild(SearchBarComponent) searchComponent!: SearchBarComponent;
  @ViewChildren('verseContainer') verseContainers!: QueryList<ElementRef>;
  constructor(private bibleService: BibleService, private sharedService: SharedService,
    private zoomService: ZoomService, private keyboardShortcutsService: KeyboardShortcutsService,
    private bookMarkService: BookMarkService, private breakpointService: BreakpointService
  ) {
    this.isLoading = true;
    this.bibleService.getBook(EndPointUrlConst.BOOK_1);
  }


  ngOnInit(): void {
    this.getBibleBooks();
    this.getScreen();
  }

  getScreen() {
    this.subscriptions.push(
      this.breakpointService.isMobile$.subscribe(isMobile => {
        this.isMobile = isMobile;
      }),
    );
  }

  ngAfterViewInit(): void { }

  onScroll(event: any) {
    const scrollTop = event.target.scrollTop;
    const header = document.getElementById('app-header');
    if (header) {
      if (scrollTop > 320) {
        header.classList.add('sticky');
        this.bibleService.setBibleState({ showBook: true, showChapter: true, showVerses: true });
      } else {
        header.classList.remove('sticky');
        this.bibleService.setBibleState({ showBook: true, showChapter: false, showVerses: false });
      }
    }
  }

  zoom(sign: string) {
    if (sign === '+') this.zoomService.zoomIn();
    else if (sign === '-') this.zoomService.zoomOut();
    else this.zoomService.reset();
  }

  getBibleBooks() {
    this.subscriptions.push(
      // books
      this.bibleService.currentBookObsCast.subscribe((data: BibleBook) => {
        this.isLoading = false;
        this.currentBook = data;
        if (!data.isBookMark) this.currentChapter = this.currentBook.chapters[0];
        this.bibleService.setBibleState({ showBook: true });
      }, () => this.isLoading = false),
      // chapters
      this.bibleService.chapterIndexObsCast.subscribe((index: number) => {
        this.currentChapterIndex = index;
        this.getCurrentChapter(this.currentBook.chapters[this.currentChapterIndex -1])
        console.log(this.currentChapter, this.currentChapterIndex);
      }),
      // verses
      this.bibleService.currentVerseIndexObsCast.subscribe((index: number) => {
        this.currentVerse = index;
        this.scrollToVerse(this.currentVerse);
      })
    )
  }

  changeChapter(action: QuickAccessActions) {
    this.searchComponent.resetInput();
    const newBookId = this.sharedService.getBookId(this.currentBook.id, action);
    switch (action) {
      case QuickAccessActions.NEXT:
        if ((this.currentChapterIndex >= this.currentBook.chapters.length)) {
          this.callToNewBook(action);
        } else {
          this.currentChapter = this.currentBook.chapters[this.currentChapterIndex];
          this.currentChapterIndex++;
        }

        break;

      case QuickAccessActions.PREV:
        if (this.currentChapterIndex > 1) {

          this.currentChapterIndex--;
          this.currentChapter = this.currentBook.chapters[this.currentChapterIndex - 1];
        } else {
          this.callToNewBook(action);
        }
        break;

      case QuickAccessActions.DOWN:
        this.bibleService.getBook(newBookId);
        this.resetDefaults();

        break;

      case QuickAccessActions.UP:
        this.bibleService.getBook(newBookId);
        this.resetDefaults();
        break;

      default:
        break;
    }
    this.bibleService.setChapterIndex(this.currentChapterIndex)

  }

  callToNewBook(action: QuickAccessActions) {
    this.resetDefaults();
    this.isLoading = true;
    const newBookId = this.sharedService.getBookId(this.currentBook.id, action);
    this.bibleService.getBook(newBookId);
  }


  resetDefaults() {
    this.currentChapterIndex = 1;
    this.bibleService.setChapterIndex(1);
    this.currentVerse = 1;
    this.bibleService.setVerseIndex(1);
    this.searchComponent.resetInput()
  }

  getCurrentChapter(data: ChapterList) {
    this.currentChapter = data;
    this.bibleService.setBibleState({
      showBook: true, showChapter: false
    });
    // this.resetForm();
  }

  resetForm(){
    this.searchComponent.chapter.reset();
    this.searchComponent.verse.reset();
  }

  @HostListener('window:keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '=')) {
      event.preventDefault();
      this.zoomService.zoomIn();
    } else if ((event.ctrlKey || event.metaKey) && event.key === '-') {
      event.preventDefault();
      this.zoomService.zoomOut();
    }
  }

  // Scroll to verse container
  scrollToVerse(verseIndex: number) {
    const verseElement = this.verseContainers && this.verseContainers.find((el, i) => i === verseIndex - 1);
    if (verseElement) {
      verseElement.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  onMouseUp(event: MouseEvent, index: number, item: VerseModel): void {
    this.bookMarkService.storeBookMarks(item, this.currentChapter, this.currentBook)
  }


  ngOnDestroy(): void {
    this.bibleService.resetDeafualts();
    this.sharedService.destroy(this.subscriptions);
    window.removeEventListener('keydown', this.onKeydown.bind(this));
    this.isMobile = false;
  }
}
