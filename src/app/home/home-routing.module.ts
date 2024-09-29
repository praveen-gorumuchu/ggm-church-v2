import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent,
    data: {
      header: {
        theme: 'transperant', isHeader: true, transition: true,
      }, body: {
        theme: 'light', noMargin: true
      }
    }
   },
  {
    path: 'home', component: HomeComponent,
    data: {
      header: {
        theme: 'transperant', isHeader: true, transition: true,
      }, body: {
        theme: 'light', noMargin: true
      }
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
