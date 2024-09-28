import { Injectable } from '@angular/core';
import { SearchRequest } from '../models/search-request.model';

@Injectable({
  providedIn: 'root'
})
export class SearchBookService {

  constructor() { }

  searchBook(query: string): SearchRequest | null {
    // Match the pattern: bookName (multiple words) + optional chapterNumber and optional verse
    const searchPattern = /^(.*?)\s*[\s,:;]?\s*(\d+)?\s*[\s,:;]?\s*(\d+)?$/;
  
    // Execute the regex to capture book name, optional chapter number, and optional verse number
    const match = query.match(searchPattern);
  
    if (match) {
      const [_, bookName, chapterNumber, verse] = match;
  
      // Prepare the result object
      const result: SearchRequest = {
        bookName: bookName.trim(),
      };
  
      if (chapterNumber) {
        result.chapterNumber = parseInt(chapterNumber, 10);
      }
  
      if (verse) {
        result.verse = parseInt(verse, 10);
      }
  
      return result;
    }
  
    return null;
  }
  



}
