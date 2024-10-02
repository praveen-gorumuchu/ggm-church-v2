import { PlayGroundModule } from './play-ground/play-ground.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from './shared/components/no-page-found/no-page-found.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/gaurds/auth-gaurd';
import { ThemeEnumModel } from './shared/models/routes/route-data.model';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    data: {
      header: {
        theme: 'transperant', isHeader: true, transition: true,
      }, body: {
        theme: 'light', noMargin: true
      }
    }
  },
  {
    path: 'bible',
    loadChildren: () => import('./bible/bible.module').then(m => m.BibleModule),
    canActivate: [AuthGuard],
    data: {
      header: {
        theme: ThemeEnumModel.DARK_HEADER, isHeader: true, transition: false, hideGlobalNav: true, 
        menuIcon: true, headerTitle: true
      }, body: {
        theme: 'dark'
      }
    }
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: {
      header: {
        theme: ThemeEnumModel.LIGHT, isHeader: false, hideGlobalNav: true
      }, body: {
        theme: 'light'
      }
    }
  },
  {
    path: 'play-ground',
    canActivate:[AuthGuard],
    loadChildren: () => import('./play-ground/play-ground.module').then(m => m.PlayGroundModule),
    data: {
      header: {
        theme: ThemeEnumModel.DARK, isHeader: false, hideGlobalNav: true
      }, body: {
        theme: 'dark'
      }
    }
  },
  {
    path: 'login', component: LoginComponent,
    data: {

    }
  },
  { path: '**', component: NoPageFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
