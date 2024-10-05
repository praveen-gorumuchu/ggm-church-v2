import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThemeEnumModel } from '../shared/models/routes/route-data.model';
import { AudienceComponent } from './components/audience/audience.component';
import { PlayGroundComponent } from './components/play-ground/play-ground.component';
import { SoloPlayComponent } from './components/solo-play/solo-play.component';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';

const routes: Routes = [
  {
    path: '', component: PlayGroundComponent,
    data: {
      header: {
        theme: ThemeEnumModel.DARK_HEADER, isHeader: false, hideGlobalNav: true
      }, body: {
        theme: 'dark', noMargin: true
      }
    },
    children: [
      {
        path: 'solo-play', component: SoloPlayComponent,
        data: {
          header: {
            theme: ThemeEnumModel.DARK_HEADER, isHeader: false, hideGlobalNav: true
          }, body: {
            theme: 'dark', noMargin: true
          }
        },
      },
      {
        path: 'auidence', component: AudienceComponent,
        data: {
          header: {
            theme: ThemeEnumModel.DARK_HEADER, isHeader: false, hideGlobalNav: true
          }, body: {
            theme: 'dark', noMargin: true
          }
        },
      },
      {
        path: 'leaderboard', component: LeaderBoardComponent,
        data: {
          header: {
            theme: ThemeEnumModel.DARK_HEADER, isHeader: false, hideGlobalNav: true
          }, body: {
            theme: 'dark', noMargin: true
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
export class PlayGroundRoutingModule { }
