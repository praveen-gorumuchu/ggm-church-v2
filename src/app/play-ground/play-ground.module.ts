import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayGroundRoutingModule } from './play-ground-routing.module';
import { SoloPlayComponent } from './components/solo-play/solo-play.component';
import { AudienceComponent } from './components/audience/audience.component';
import { PlayGroundComponent } from './components/play-ground/play-ground.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaticipentComponent } from './components/paticipent/paticipent.component';
import { ArrowsComponent } from './components/arrows/arrows.component';
import { PlayerInteractionComponent } from './components/player-interaction/player-interaction.component';
import { QuizQuestionsComponent } from './components/quiz-questions/quiz-questions.component';



@NgModule({
  declarations: [
    SoloPlayComponent,
    AudienceComponent,
    PlayGroundComponent,
    PaticipentComponent,
    ArrowsComponent,
    PlayerInteractionComponent,
    QuizQuestionsComponent
  ],
  imports: [
    CommonModule,
    PlayGroundRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlayGroundModule { }
