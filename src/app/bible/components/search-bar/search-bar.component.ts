import { BibleBook, BookmarkListModel, ChapterList } from './../../../shared/models/bible-books/bible-books.model';
import { UtilSharedService } from './../../../shared/services/util-shared.service';
import { Observable, of, Subscription } from 'rxjs';
import { SearchRequest } from '../../../shared/models/search-request.model';
import { SearchBookService } from './../../../shared/services/search-book.service';
import { ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BibileBookList, BibleBookTypes } from '../../../shared/models/bible-books/bible-books.model';
import { BibleService } from '../../../shared/services/bible.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteTrigger, MatOption } from '@angular/material/autocomplete';
import { StringConstant } from '../../../shared/constants/string-constant';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnChanges {
  @Input() currentBook!: BibleBook;
  searchForm!: FormGroup;
  filteredBooks!: Observable<BibileBookList[]>;
  filteredChapters!: Observable<number[]>;
  bibleBooks: BibileBookList[] = [];
  chapterList: number[] = [];
  isBookSelected: boolean = false;
  isChapterSelected = false;
  subs: Subscription[] = [];

  @ViewChild('bookInput') bookInput!: ElementRef;
  @ViewChild('chapterInput') chapterInput!: ElementRef;
  @ViewChild('verseInput') verseInput!: ElementRef;
  @ViewChild(MatAutocompleteTrigger) booksAutoComplete!: MatAutocompleteTrigger;
  @ViewChild(MatAutocompleteTrigger) chaptersAutoComplete!: MatAutocompleteTrigger;
  keydownListener!: (event: KeyboardEvent) => void;

  constructor(private searchBookService: SearchBookService,
    private bibleService: BibleService, private ngZone: NgZone,
    private utilSharedService: UtilSharedService, private fb: FormBuilder
  ) {
    this.searchForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.subs.push(
      this.bibleService.bibleBooksObsCast.subscribe((books: BibleBookTypes[]) => {
        this.ngZone.run(() => {
          this.bibleBooks = this.combineBibleBooks(books);
        });
      }))

    this.keydownListener = this.onKeydown.bind(this);
    window.addEventListener('keydown', this.keydownListener);
    this.getFilteredOptions();
    this.getChapterLis();
    // this.populateDeafult();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.getChapterLis();
    // this.populateDeafult()

  }

  populateDeafult() {
    this.book.patchValue(this.currentBook);
    this.chapter.patchValue(1);
    this.verse.patchValue(1)
  }

  getChapterLis() {
    this.chapterList = this.utilSharedService.convertNumToArray(this.currentBook.chapters.length);
  }

  onSearchChange(query: any) { }

  getFilteredOptions() {
    this.filteredBooks =
      this.utilSharedService.filterBooks(this.book, this.bibleBooks, StringConstant.TRANS);
    this.filteredChapters = this.utilSharedService.filteredDataComesFirst(
      this.chapter, this.chapterList);
  }

  clear() {
    this.resetInput();
  }

  defaultSelect() {
  }


  onBookSelected(option: MatOption) {
    this.chapter.reset();
    this.verse.reset();
    const selectedBook = option.value as BibileBookList;
    if (selectedBook) {
      this.bibleService.getBook(selectedBook.id);
      this.chapterList = Array.from({ length: selectedBook.chapterCount }, (_, i) => i + 1);
      this.isBookSelected = true;
      this.filteredChapters = this.utilSharedService.filteredDataComesFirst(
        this.chapter, this.chapterList);
      setTimeout(() => {
        this.chapterInput.nativeElement.focus();
      })
    } else this.isBookSelected = false;
  }

  onChapterSelected(val: any) {
    const idx = parseInt(this.chapter.value);
    if (idx <= this.chapterList.length) {
      this.isChapterSelected = true;
      this.bibleService.setChapterIndex(this.chapter.value);
      setTimeout(() => {
        this.verseInput.nativeElement.focus();
      })
    } else this.isChapterSelected = false;
  }

  onBlurChapter() {
    const val = parseInt(this.chapter.value);
    if (val <= this.chapterList.length) {
      this.chapter.patchValue(this.chapter.value);
      this.onChapterSelected(this.chapter.value);
      this.chapter.setErrors(null);
    } else {
      if (this.chapter.touched && this.chapter.value) this.chapter.setErrors({ inValid: true });
    }
    this.searchForm.updateValueAndValidity();
  }

  onBlurVerse() {
    const val = parseInt(this.verse.value);
    if (val <= this.chapterList[this.chapter.value]) {
      this.chapter.patchValue(val);
      this.onVerseSelected();
      this.verse.setErrors(null);
    } else {
      if (this.verse.touched && this.verse.value) this.verse.setErrors({ inValid: true });
    }
    this.searchForm.updateValueAndValidity();
  }

  onVerseSelected() {
    if (this.verse && this.verse.value) {
      this.bibleService.setVerseIndex(this.verse.value);
    }
  }

  displayFn(book: BibleBookTypes): string {
    return book && book.name ? book.name : '';
  }

  combineBibleBooks(bibleBooks: BibleBookTypes[]): BibileBookList[] {
    return bibleBooks.reduce<BibileBookList[]>((accumulator, current) => {
      return accumulator.concat(current.books);
    }, []);
  }

  onSearchClick() { }

  prepareBookRequest() {
    const searchObj: SearchRequest | null = this.searchBookService.searchBook(this.book?.value.id);
    if (searchObj && searchObj.bookName) {
      const bookName = this.bibleBooks.find((data: BibileBookList) =>
        data.name.includes(searchObj?.bookName));
      if (bookName && bookName.id) {
        const chapterIdx = searchObj && searchObj.chapterNumber && Number(searchObj.chapterNumber) || 1;
        const verseIdx = searchObj && searchObj.verse && Number(searchObj.verse) || 1;
        this.bibleService.getBook(bookName.id, false, chapterIdx, verseIdx);
        this.resetInput();
      }
    }
  }

  get isChapterError(): boolean {
    return this.chapter.hasError('inValid');
  }

  get book(): AbstractControl {
    return this.searchForm.get('book') as AbstractControl
  }

  get chapter(): AbstractControl {
    return this.searchForm.get('chapter') as AbstractControl
  }
  get verse(): AbstractControl {
    return this.searchForm.get('verse') as AbstractControl
  }

  resetInput(): void {
    if (this.searchForm) {
      this.searchForm.reset();
    }
  }

  onKeydown(event: KeyboardEvent) {
    const { ctrlKey, key } = event;
    if (ctrlKey && key === 'f') {
      event.preventDefault(); // Prevent the default browser search
      this.resetInput();
      this.bookInput.nativeElement.focus();
    }
  }


  createFormGroup(): FormGroup {
    return this.fb.group({
      book: ['', [Validators.required]],
      chapter: [''],
      verse: ['']

    });

  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.keydownListener);
    this.isBookSelected = false;
    this.isChapterSelected = false;
    this.bibleBooks = [];
  }



}
