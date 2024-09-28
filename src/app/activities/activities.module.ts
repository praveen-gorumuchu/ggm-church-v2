import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { BooleanQuestionComponent } from './components/boolean-question/boolean-question.component';
import { QuestionAnswerComponent } from './components/question-answer/question-answer.component';
import { LetterFillComponent } from './components/letter-fill/letter-fill.component';
import { ActivityHomeComponent } from './components/activity-home/activity-home.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [
    BooleanQuestionComponent,
    QuestionAnswerComponent,
    LetterFillComponent,
    ActivityHomeComponent,
    CreateQuizComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ActivitiesModule { }
