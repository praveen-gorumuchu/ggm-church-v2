import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BibleBook, ChapterList } from '../../../shared/models/bible-books/bible-books.model';
import { BibleService } from '../../../shared/services/bible.service';


@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.scss']
})
export class ChaptersComponent implements OnChanges, OnInit {
  @Input() currentBook!: BibleBook;
  @Input() currentChapterIndex: number = 1;
  @Output() currentChapter = new EventEmitter<ChapterList>();
  isActiveChapter!: ChapterList;

  constructor(private bibleService: BibleService) { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.isActiveChapter = this.currentBook.chapters[this.currentChapterIndex - 1];
  }

  isActive(data: ChapterList) {
    return this.isActiveChapter.id.toLowerCase() === data.id.toLowerCase();
  }

  onChapterClick(data: ChapterList) {
    this.isActiveChapter = data;
    let index = data.name.match(/\d+$/);
    this.bibleService.setChapterIndex(index ? parseInt(index[0]) : 1);
    this.currentChapter.emit(data);
  }
}
