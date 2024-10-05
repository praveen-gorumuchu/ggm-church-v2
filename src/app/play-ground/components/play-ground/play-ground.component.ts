import { MenuListModel, MenuListNameEnum } from './../../../shared/constants/menu-list';
import { QuizPlayService } from './../../services/quiz-play.service';


import { SpeechService } from './../../../shared/services/speech.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeechTextConstant } from '../../constants/interation-effects';
import { GenerateIdConst } from '../../../shared/constants/generate-id.constant';
import { StorageKeyConstant } from '../../../shared/constants/storage-keys.constant';
import { RouterConstant } from '../../../shared/constants/router.constant';
import { MenuList, PlayGroundMenu } from '../../../shared/constants/menu-list';

@Component({
  selector: 'app-play-ground',
  templateUrl: './play-ground.component.html',
  styleUrl: './play-ground.component.scss'
})
export class PlayGroundComponent implements OnInit, OnDestroy {
  speechEnabled: boolean = false;
  menuList: MenuListModel[] = PlayGroundMenu;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private speechService: SpeechService, private quizPlayService: QuizPlayService
  ) {

  }

  ngOnInit(): void {

  }

  onLogoClick() {
    this.router.navigate(['/home'])
  }

  onMenuClick(menu: MenuListModel) {
    if (menu.name === MenuListNameEnum.endQuiz) {
      const result = this.quizPlayService.endQuiz();
      this.router.navigate([menu.url]);
    } else {
      this.router.navigate([menu.url]);
    }
  }

  toggleSpeech(): void {
    this.speechEnabled = !this.speechEnabled
    if (this.speechEnabled) {
      this.speechService.speak(SpeechTextConstant.speech_mode_on);
    } else {
      this.speechService.stop();
    }
  }


  ngOnDestroy(): void {
    // this.quizPlayService.resetData();
  }
}
