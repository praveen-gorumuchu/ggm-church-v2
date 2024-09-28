import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CardsComponent } from './components/cards/cards.component';


const material = [
  MatCardModule,
  MatRippleModule,
  MatButtonModule,
  MatIconModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactUsComponent,
    GalleryComponent,
    CardsComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ...material,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
