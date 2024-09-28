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


const materialModules = [
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule
]

@NgModule({
  declarations: [
    BibleBooksComponent,
    SafePipe,
    NoPageFoundComponent
  ],
  imports: [
    CommonModule,
    ...materialModules,
  ],
  exports: [
    ...materialModules,
    NoPageFoundComponent,
    SafePipe
  ],
  providers: [
    provideHttpClient()
  ]
})
export class SharedModule { }
