import { ActivitiesModule } from './activities/activities.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from './shared/components/no-page-found/no-page-found.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/gaurds/auth-gaurd';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],  // Protect the home module
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'bible',
    loadChildren: () => import('./bible/bible.module').then(m => m.BibleModule),
    canActivate: [AuthGuard],
    data: { headerClass: 'bible-header' }
  },
  {
    path: 'activity',
    loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule),
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NoPageFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
