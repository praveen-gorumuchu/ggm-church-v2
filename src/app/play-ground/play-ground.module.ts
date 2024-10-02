import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayGroundRoutingModule } from './play-ground-routing.module';
import { SoloPlayComponent } from './components/solo-play/solo-play.component';
import { AudienceComponent } from './components/audience/audience.component';
import { PlayGroundComponent } from './components/play-ground/play-ground.component';


@NgModule({
  declarations: [
    SoloPlayComponent,
    AudienceComponent,
    PlayGroundComponent
  ],
  imports: [
    CommonModule,
    PlayGroundRoutingModule
  ]
})
export class PlayGroundModule { }
