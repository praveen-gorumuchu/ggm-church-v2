import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibleRoutingModule } from './bible-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MainComponent } from './components/main/main.component';
import { ChaptersComponent } from './components/chapters/chapters.component';
import { QuickAccessComponent } from './components/quick-access/quick-access.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BookMarkComponent } from './components/book-mark/book-mark.component';

const material = [
  MatProgressSpinnerModule,
  MatBottomSheetModule,
  MatCardModule,
  MatAutocompleteModule
]

@NgModule({
  declarations: [
    MainComponent,
    ChaptersComponent,
    QuickAccessComponent,
    SearchBarComponent,
    BookMarkComponent
  ],
  imports: [
    CommonModule,
    BibleRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    A11yModule,
    // DragDropModule,
    ...material
  ],
  exports: [
    SearchBarComponent
  ]
})
export class BibleModule { }
