import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibleBooksComponent } from './components/bible-books/bible-books.component';

import {MatSidenavModule} from '@angular/material/sidenav';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { provideHttpClient } from '@angular/common/http';
import { SafePipe } from './pipes/safe.pipe';
import { NoPageFoundComponent } from './components/no-page-found/no-page-found.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { MaterialModule } from '../material.module';
import { MatSpinnerComponent } from './components/mat-spinner/mat-spinner.component';
import { DataTablesComponent } from './components/data-tables/data-tables.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const materialModules = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MaterialModule
]

@NgModule({
  declarations: [
    BibleBooksComponent,
    SafePipe,
    NoPageFoundComponent,
    BottomSheetComponent,
    MatSpinnerComponent,
    DataTablesComponent,
    FileUploadComponent,
    MatSpinnerComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    ...materialModules,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ...materialModules,
    NoPageFoundComponent,
    SafePipe, DataTablesComponent, MatSpinnerComponent, DialogComponent, FileUploadComponent
  ],
  providers: [
    provideHttpClient()
  ]
})
export class SharedModule { }
