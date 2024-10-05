import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
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
import { NgxPrintModule } from 'ngx-print';


@NgModule({
  declarations: [
    RegisterStudentComponent,
    CreateQuizComponent,
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
    NgxPrintModule,
    QuillModule.forRoot({
      modules: {
        toolbar: [
          [{ 'header': [1, 2, false] }], 
          ['bold', 'italic', 'underline'], 
          ['link', 'image'],
          ['clean'] 
        ],
        theme: 'dark'
      },
    }),
  ],
  providers: [
    TitleCasePipe,

  ]
})
export class DashboardModule { }
