import { Injectable } from '@angular/core';
import { BibleBook, BookmarkListModel, ChapterList, VerseModel } from '../models/bible-books/bible-books.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookMarkService {
  selectedTextData: BookmarkListModel[] = [];

  private isBookmarkClickedObs = new BehaviorSubject<BookmarkListModel>({
    verseId: '', currentBookId: '', currentChapterId: '', chapterName: '', bookName: ''
  });
  readonly isBookMarkClickedObsCast = this.isBookmarkClickedObs.asObservable();

  private bookMarksListObs = new BehaviorSubject<BookmarkListModel[]>([]);
  readonly bookMarksListObsCast = this.bookMarksListObs.asObservable();

  constructor() { }

  storeBookMarks(verse: VerseModel, chapter: ChapterList, book: BibleBook) {


    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return; // No selection
    const selectedText = selection.toString().trim();
    const existing: BookmarkListModel[] = this.getBookMarks();
    const newList: BookmarkListModel = {
      verseId: verse.id, currentChapterId: chapter.id, currentBookId: book.id,
      bookName: book.name, chapterName: chapter.name
    }
    const isDuplicate = existing.some((bookmark) =>
      bookmark.verseId === newList.verseId &&
      bookmark.currentChapterId === newList.currentChapterId &&
      bookmark.currentBookId === newList.currentBookId
    );
    existing.push(newList);
    if (!isDuplicate && selectedText && verse.des.includes(selectedText)) {
      existing.push(newList);
      this.selectedTextData = existing;
      this.removeDuplicates();
      this.setNewBookMark(this.selectedTextData);
    }
  }

  removeDuplicates(): void {
    const uniqueData = Array.from(new Set(this.selectedTextData.map(item => JSON.stringify(item))))
      .map(item => JSON.parse(item));

    this.selectedTextData = uniqueData;
    localStorage.setItem('bookmark', JSON.stringify(this.selectedTextData));
  }


  getBookMarks(): BookmarkListModel[] {
    const storedData = localStorage.getItem('bookmark');
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (error) {
        console.error('Error parsing stored data:', error);
        return [];
      }
    }
    return [];
  }

  sortBookmarks(bookmarks: BookmarkListModel[]): BookmarkListModel[] {
    return bookmarks.sort((a, b) => {
      // Sort by currentBookId (assumes format "book1", "book2", ...)
      const bookComparison = a.currentBookId.localeCompare(b.currentBookId, undefined, { numeric: true });

      // If currentBookId is the same, sort by currentChapterId
      if (bookComparison !== 0) {
        return bookComparison;
      }

      const chapterComparison = a.currentChapterId.localeCompare(b.currentChapterId, undefined, { numeric: true });

      // If currentChapterId is also the same, sort by verseId
      if (chapterComparison !== 0) {
        return chapterComparison;
      }

      // Finally, sort by verseId (as a number)
      return Number(a.verseId) - Number(b.verseId);
    });
  }


  setBookMarkClicked(data: BookmarkListModel) {
    this.isBookmarkClickedObs.next(data);
  }

  setNewBookMark(data: BookmarkListModel[]) {
    this.bookMarksListObs.next(data);
  }

  clearAll() {
    this.bookMarksListObs.next([]);
    localStorage.removeItem('bookmark');
  }

}
