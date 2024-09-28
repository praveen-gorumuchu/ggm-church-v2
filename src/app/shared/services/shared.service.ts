import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuickAccessActions } from '../models/bible-books/quick-access.model';
import { BibileBookList, BibleBookTypes } from '../models/bible-books/bible-books.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  getBookId(curentBook: string, action: QuickAccessActions): string {
    const parts = curentBook.split('book'); // Split the string by 'book'
    let bookNumber = parseInt(parts[1], 10); // Extract the number after 'book'
    // Handle next or previous
    if (action === QuickAccessActions.NEXT || action === QuickAccessActions.DOWN) {
      if (bookNumber < 66) {
        bookNumber++; // Increment for next
      } else {
        bookNumber = 1; // Wrap around to book 1 if the number exceeds 66
      }
    } else if (action === QuickAccessActions.PREV || action === QuickAccessActions.UP) {
      if (bookNumber > 1) {
        bookNumber--; // Decrement for previous
      } else {
        bookNumber = 66; // Wrap around to book 66 if the number goes below 1
      }
    }

    return `book${bookNumber}`;
  }

  getIndex(chapterName: string): number | null {
    const match = chapterName.match(/\d+/); // Use regex to match digits
    if (match) {
      return parseInt(match[0], 10); // Convert the matched string to a number
    }
    return null; // Return null if no number is found
  }

  combineBibleBooks(bibleBooks: BibleBookTypes[]): BibileBookList[] {
    if (!bibleBooks || !Array.isArray(bibleBooks)) {
      // Return an empty array if bibleBooks is null, undefined, or not an array
      console.error('Invalid bibleBooks input: ', bibleBooks);
      return [];
    }
    
    return bibleBooks.reduce<BibileBookList[]>((accumulator, current) => {
      if (current && Array.isArray(current.books)) {
        // Safely concatenate only if current.books is a valid array
        return accumulator.concat(current.books);
      }
      return accumulator;
    }, []);
  }
  



  destroy(subs: Subscription[]) {
    if (subs && subs.length > 0) {
      subs.forEach((sub: Subscription) => sub.unsubscribe);
    }
  }
}
