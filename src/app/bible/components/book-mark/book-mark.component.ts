import { MatMenuTrigger } from '@angular/material/menu';
import { BookmarkListModel } from '../../../shared/models/bible-books/bible-books.model';
import { BibleService } from '../../../shared/services/bible.service';
import { SharedService } from '../../../shared/services/shared.service';
import { BookMarkService } from './../../../shared/services/bookmark.service';
import { Component, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-book-mark',
  templateUrl: './book-mark.component.html',
  styleUrl: './book-mark.component.scss'
})
export class BookMarkComponent implements OnInit, OnChanges, OnDestroy {
  bookMarkList: BookmarkListModel[] = [];
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor(private bookMarkService: BookMarkService,
    private bibleService: BibleService, private sharedService: SharedService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.getBookMarks();
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  openMenu() {
    this.menuTrigger.toggleMenu();
  }

  getBookMarks() {
    this.bookMarkService.bookMarksListObsCast.subscribe((data: BookmarkListModel[]) => {
      const bookMarks: BookmarkListModel[] = this.bookMarkService.getBookMarks();
      this.bookMarkList = this.bookMarkService.sortBookmarks(bookMarks);
    })
  }

  onBookMarkClick(data: BookmarkListModel) {
    this.bookMarkService.setBookMarkClicked(data);
    this.bibleService.getBook(data.currentBookId, true);
  }

  getChapterNumber(chapter: string): number | null {
    return this.sharedService.getIndex(chapter);
  }

  deleteAll() {
    this.bookMarkService.clearAll();
    this.bookMarkList = [];
  }

  onControlQ() {

  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey) { // Check if Control key is pressed
      switch (event.key) {
        case 'q':
          event.preventDefault(); // Prevent the default action (if any)
          this.ngZone.run(() => {
            this.openMenu();
          });
          break;

        // Add other key cases here if needed
        default:
          break;
      }
    }
  }


  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));


  }


}
