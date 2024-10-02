import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { PlayQuizComponent } from './components/play-quiz/play-quiz.component';
import { StudentsComponent } from './components/students/students.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { DashSideNavComponent } from './components/dash-side-nav/dash-side-nav.component';
import { DashHeaderComponent } from './components/dash-header/dash-header.component';
import { OverviewComponent } from './components/overview/overview.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuillModule } from 'ngx-quill';



@NgModule({
  declarations: [
    RegisterStudentComponent,
    CreateQuizComponent,
    PlayQuizComponent,
    StudentsComponent,
    DashboardComponent,
    EvaluationComponent,
    DashSideNavComponent,
    DashHeaderComponent,
    OverviewComponent,
    QuizComponent

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }], 
          ['bold', 'italic', 'underline'], 
          ['link', 'image'],
          ['clean'] 
        ],
      },
    }),
  ],
  providers: [
    TitleCasePipe,

  ]
})
export class DashboardModule { }
