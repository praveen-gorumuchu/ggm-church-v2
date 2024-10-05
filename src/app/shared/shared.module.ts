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
import { ShorterTextDirective } from './directives/shorter-text.directive';
import { AllowedNumbersDirective } from './directives/allowed-number.directive';
import { MatDailogComponent } from './components/mat-dailog/mat-dailog.component';
import { NgxPrintModule } from 'ngx-print';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DD_MM_YYY_FORMAT } from './constants/date-format';
import { MatCardTableComponent } from './components/mat-card-table/mat-card-table.component';

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
    DialogComponent,
    ShorterTextDirective,
    AllowedNumbersDirective,
    MatDailogComponent,
    MatCardTableComponent,
  ],
  imports: [
    CommonModule,
    ...materialModules,
    ReactiveFormsModule,
    FormsModule,
    NgxPrintModule
  ],
  exports: [
    ...materialModules,
    NoPageFoundComponent,
    SafePipe, DataTablesComponent, MatSpinnerComponent, DialogComponent, FileUploadComponent,
    ShorterTextDirective, AllowedNumbersDirective, MatCardTableComponent
  ],
  providers: [
    provideHttpClient(),
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DD_MM_YYY_FORMAT },
  ]
})
export class SharedModule { }
