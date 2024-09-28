import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionAnswerComponent } from './components/question-answer/question-answer.component';
import { LetterFillComponent } from './components/letter-fill/letter-fill.component';
import { BooleanQuestionComponent } from './components/boolean-question/boolean-question.component';
import { ActivityHomeComponent } from './components/activity-home/activity-home.component';
import {  CreateQuizComponent } from './components/create-quiz/create-quiz.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'activity-home' },

  { path: 'activity-home', component: ActivityHomeComponent },
  { path: 'question-answer', component: QuestionAnswerComponent },
  { path: 'complete-the-word', component: LetterFillComponent },
  { path: 'true-or-false', component: BooleanQuestionComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
