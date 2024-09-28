import { SharedService } from './shared.service';
import { BookMarkService } from './bookmark.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { BibileBookList, BibleBook, BibleBookTypes, BibleBooksModel, BookmarkListModel, ChapterList, VerseModel } from '../models/bible-books/bible-books.model';
import { environment } from '../../../environments/environment';
import { BibleStateModel } from '../models/bible.state.model';
import { EndPointUrlConst } from '../constants/end-point-url.constant';

@Injectable({
  providedIn: 'root'
})

export class BibleService {
  bookList: BibileBookList[] = [];
  private bibleBooksObs = new BehaviorSubject<BibleBookTypes[]>([]);
  readonly bibleBooksObsCast = this.bibleBooksObs.asObservable();
  private currentBookObs = new BehaviorSubject<BibleBook | any>({
    chapters: [],
    name: '',
    id: ''
  });
  readonly currentBookObsCast = this.currentBookObs.asObservable();
  private isShowBook = new BehaviorSubject<BibleStateModel>({
    showBook: false,
    showChapter: false,
    showVerses: false
  });
  readonly isShowObasCast = this.isShowBook.asObservable();
  private chapterIndexObs = new BehaviorSubject<number>(1);
  readonly chapterIndexObsCast = this.chapterIndexObs.asObservable();
  private currentVerseIndexObs = new BehaviorSubject<number>(1);
  readonly currentVerseIndexObsCast = this.currentVerseIndexObs.asObservable();

  private localStorageKey = 'bibleKey';
  temp = false;

  constructor(private http: HttpClient, private bookMarkService: BookMarkService,
    private sharedService: SharedService
  ) {
    this.loadData();
  }

  get baseUrl(): string {
    return `${environment.apiUrl}/${EndPointUrlConst.BIBLE_BOOKS}/`;
  }


  private loadData() {
    const cachedData: any = localStorage.getItem(this.localStorageKey);
    if (this.temp) {
      this.bibleBooksObs.next(JSON.parse(cachedData));
    } else {
      this.fetchDataFromLocalJSON();
    }
  }

  private fetchDataFromLocalJSON() {
    this.http.get<BibleBooksModel>(`${this.baseUrl}${EndPointUrlConst.BOOK_LIST}`)
      .pipe(tap((data: BibleBooksModel) => {
        sessionStorage.setItem(this.localStorageKey, JSON.stringify(data));
        this.bibleBooksObs.next(data.list);
        this.bookList = this.sharedService.combineBibleBooks(data.list);
      }), catchError(error => {
        console.error('Error fetching data', error);
        return of([]);
      })
      )
      .subscribe();
  }



  getBook(path: string, isBookmark?: boolean, chapterIdx?: number, verseIdx?: number) {
    return this.http.get<BibleBook>(`${this.baseUrl}${path}.json`).pipe(
      tap((data: BibleBook) => {
        this.currentBookObs.next(data);
        if (isBookmark) {
          data.isBookMark = true;
          this.setBookMarkData(data);
          if (chapterIdx && chapterIdx >= 0 && chapterIdx <= data.chapters.length) this.setChapterIndex(chapterIdx);
          if (verseIdx && verseIdx >= 0 &&
            verseIdx <= data.chapters[this.currentVerseIndexObs.getValue()].verses.length) {
            this.setVerseIndex(verseIdx);
          }
        }
      })
    ).subscribe();
  }

  setBookMarkData(book: BibleBook) {
    this.bookMarkService.isBookMarkClickedObsCast.subscribe((data: BookmarkListModel) => {
      let chapterIdx = 1;
      let verseIdx = 1;
      // Find the matching chapter based on the currentChapterId
      const chapter = book.chapters.find((chapter: ChapterList) => chapter.id === data.currentChapterId);
      if (chapter) {
        // Get the chapter index from shared service or default to 1
        chapterIdx = this.sharedService.getIndex(chapter.id) ?? 1;

        const verse = chapter.verses.find((verse: VerseModel) => verse.id === data.verseId);
        if (verse) verseIdx = Number(verse.id);

      }

      // Set the chapter and verse index
      this.setChapterIndex(chapterIdx);
      this.setVerseIndex(verseIdx);
    });
  }


  setCurrentBook(book: BibleBook) {
    this.currentBookObs.next(book);
  }

  setBibleState(data: BibleStateModel) {
    this.isShowBook.next(data);
  }

  setChapterIndex(flag: number) {
    this.chapterIndexObs.next(flag);
  }

  setVerseIndex(num: number) {
    this.currentVerseIndexObs.next(num);
  }

  resetDeafualts() {
    this.isShowBook.next({
      showBook: false, showChapter: false, showVerses: false
    });
    this.chapterIndexObs.next(1)

  }

  destory() {
    this.bibleBooksObs.unsubscribe();
    this.chapterIndexObs.unsubscribe();
  }



}
