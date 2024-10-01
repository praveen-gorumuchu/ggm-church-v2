import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { PlayQuizComponent } from './components/play-quiz/play-quiz.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { StudentsComponent } from './components/students/students.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { OverviewComponent } from './components/overview/overview.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      {
        path: '', redirectTo: 'home', pathMatch: 'full'
      },
      { path: 'home', component: OverviewComponent },
      { path: 'create-quiz', component: CreateQuizComponent },
      { path: 'play-quiz', component: PlayQuizComponent },
      { path: 'register-student', component: RegisterStudentComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'evaluation', component: EvaluationComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
