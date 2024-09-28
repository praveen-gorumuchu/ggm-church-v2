import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsRoutingModule } from './songs-routing.module';
import { SongsComponent } from './components/songs/songs.component';
import { SearchSongComponent } from './components/search-song/search-song.component';


@NgModule({
  declarations: [
    SongsComponent,
    SearchSongComponent
  ],
  imports: [
    CommonModule,
    SongsRoutingModule
  ]
})
export class SongsModule { }
