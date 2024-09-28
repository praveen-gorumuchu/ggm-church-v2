import { BibleService } from './../../../shared/services/bible.service';
import { SharedService } from './../../../shared/services/shared.service';
import { Component, Output, EventEmitter, OnInit, OnDestroy, Input, NgZone, HostListener } from '@angular/core';
import { QuickAccessActions } from '../../../shared/models/bible-books/quick-access.model';
import { BookMarkService } from '../../../shared/services/bookmark.service';
import { BookmarkListModel } from '../../../shared/models/bible-books/bible-books.model';
import { fromEvent, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrl: './quick-access.component.scss'
})
export class QuickAccessComponent implements OnInit, OnDestroy {
  @Output() changeChapter = new EventEmitter<QuickAccessActions>();
  @Input() disableNext: boolean = false;
  @Input() disablePrev: boolean = false;
  action = QuickAccessActions;
  showLeftArrow!: boolean;
  showRightArrow!: boolean;
  showUpArrow!: boolean;
  showDownArrow!: boolean;
  showScrollArrow: boolean = false;
  scrollSubscription!: Subscription;

  constructor(private ngZone: NgZone, private bookMarkService: BookMarkService,
    private sharedService: SharedService, private bibleService: BibleService) { }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('keydown', this.handleKeyDown.bind(this));
    });
    this.showScroll();
  }


  showScroll() {
    const scrollableElement = document.getElementById('contentBlock') as HTMLElement;
    if (scrollableElement) {
      this.scrollSubscription = fromEvent(scrollableElement, 'scroll')
        .pipe(map(() => scrollableElement.scrollTop))
        .subscribe(scrollTop => {
          this.showScrollArrow = scrollTop > 180; // Show button after scrolling down 100px
        });
    }
  }

  scrollToTop() {
    const scrollableElement = document.getElementById('contentBlock') as HTMLElement;
    if (scrollableElement) {
      scrollableElement.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }



  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const { clientX } = event;
    const viewportWidth = window.innerWidth;
    this.showLeftArrow = clientX < 60;
    this.showRightArrow = clientX > viewportWidth - 60;
  }


  handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();

      switch (event.key) {
        case 'ArrowRight':
          this.ngZone.run(() => {
            this.onChangeChapter(QuickAccessActions.NEXT);
          });
          break;

        case 'ArrowLeft':
          this.ngZone.run(() => {
            this.onChangeChapter(QuickAccessActions.PREV);
          });
          break;
        case 'ArrowUp':
          this.ngZone.run(() => {
            this.onChangeChapter(QuickAccessActions.UP);
          });
          break;

        case 'ArrowDown':
          this.ngZone.run(() => {
            this.onChangeChapter(QuickAccessActions.DOWN);
          });
          break;

        default:
          break;
      }
    }




  }

  onChangeChapter(action: QuickAccessActions) {
    this.changeChapter.emit(action);
  }

  ngOnDestroy(): void {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this));
    this.scrollSubscription.unsubscribe();
  }
}
