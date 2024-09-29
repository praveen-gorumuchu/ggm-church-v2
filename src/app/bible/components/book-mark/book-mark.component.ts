import { MatMenuTrigger } from '@angular/material/menu';
import { BookmarkListModel } from '../../../shared/models/bible-books/bible-books.model';
import { BibleService } from '../../../shared/services/bible.service';
import { SharedService } from '../../../shared/services/shared.service';
import { BookMarkService } from './../../../shared/services/bookmark.service';
import { Component, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { BottomSheetComponent } from '../../../shared/components/bottom-sheet/bottom-sheet.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { StringConstant } from '../../../shared/constants/string-constant';

@Component({
  selector: 'app-book-mark',
  templateUrl: './book-mark.component.html',
  styleUrl: './book-mark.component.scss',
})
export class BookMarkComponent implements OnInit, OnChanges, OnDestroy {
  bookMarkList: BookmarkListModel[] = [];
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  constructor(private bookMarkService: BookMarkService,
    private bibleService: BibleService, private sharedService: SharedService,
    private ngZone: NgZone, private bottomSheet: MatBottomSheet
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
    if (event.ctrlKey) {
      switch (event.key) {
        case 'q':
          event.preventDefault();
          this.ngZone.run(() => {
            // this.openMenu();
            this.openBottomSheet();
          });
          break;

        default:
          break;
      }
    }
  }

  openBottomSheet() {
    const bottomSheetRef = this.bottomSheet.open(BottomSheetComponent, {
      data: { list: this.bookMarkList, title: StringConstant.RECENTLY_VIEWD,
        noResult: StringConstant.NO_BOOKMARKS_FOUND
       }
    });
    bottomSheetRef.afterDismissed().subscribe((result) => {
      console.log(result);
      if (result) {
        if (result.action === 'book') {
          this.onBookMarkClick(result.data as BookmarkListModel)
        }
        if (result.action === 'delete') {
          this.deleteAll();
        }
      }
    });
  }



  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));


  }


}
