import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { PlayQuizComponent } from '../play-ground/components/play-quiz/play-quiz.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { StudentsComponent } from './components/students/students.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { OverviewComponent } from './components/overview/overview.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ThemeEnumModel } from '../shared/models/routes/route-data.model';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,

    children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      {
        path: 'home', component: OverviewComponent,
        data: {
          header: {
            theme: ThemeEnumModel.LIGHT, isHeader: false, hideGlobalNav: true
          }, body: {
            theme: 'light', noMargin: true
          }
        },
      },
      {
        path: 'create-quiz', component: CreateQuizComponent,
        data: {
          header: {
            theme: ThemeEnumModel.LIGHT, isHeader: false, hideGlobalNav: true
          }, body: {
            theme: 'light',noMargin: true
          }
        },
      },
      {
        path: 'quiz', component: QuizComponent,
        data: {
          header: {
            theme: ThemeEnumModel.LIGHT, isHeader: false, hideGlobalNav: true
          }, body: {
            theme: 'light', noMargin: true
          }
        },
      },
      {
        path: 'register-student', component: RegisterStudentComponent,
        data: {
          header: {
            theme: ThemeEnumModel.LIGHT, isHeader: false, hideGlobalNav: true
          }, body: {
            theme: 'light', noMargin: true
          }
        },
      },
      {
        path: 'students', component: StudentsComponent,
        data: {
          header: {
            theme: ThemeEnumModel.LIGHT, isHeader: false, hideGlobalNav: true
          }, body: {
            theme: 'light', noMargin: true
          }
        },
      },
      {
        path: 'evaluation', component: EvaluationComponent,
        data: {
          header: {
            theme: ThemeEnumModel.LIGHT, isHeader: false, hideGlobalNav: true
          }, body: {
            theme: 'light', noMargin: true
          }
        },
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
