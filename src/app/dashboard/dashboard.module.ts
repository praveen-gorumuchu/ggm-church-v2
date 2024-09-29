import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { PlayQuizComponent } from './components/play-quiz/play-quiz.component';


@NgModule({
  declarations: [
    RegisterStudentComponent,
    CreateQuizComponent,
    PlayQuizComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
