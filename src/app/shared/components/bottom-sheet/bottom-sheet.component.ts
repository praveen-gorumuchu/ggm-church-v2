import { Component, Inject, inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { BookmarkListModel } from '../../models/bible-books/bible-books.model';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrl: './bottom-sheet.component.scss'
})
export class BottomSheetComponent {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public dataSource: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    private sharedService: SharedService) {
  }

  getChapterNumber(chapter: string): number | null {
    return this.sharedService.getIndex(chapter);
  }

  onClick(action: string, data?: any) {
    this.bottomSheetRef.dismiss({ action, data });
  }

  close() {
    this.bottomSheetRef.dismiss({ action: 'close' });
  }

}
