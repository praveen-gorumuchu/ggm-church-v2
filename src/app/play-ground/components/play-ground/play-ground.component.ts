

import { SpeechService } from './../../../shared/services/speech.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-play-ground',
  templateUrl: './play-ground.component.html',
  styleUrl: './play-ground.component.scss'
})
export class PlayGroundComponent implements OnInit, OnDestroy {
  speechEnabled: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private speechService: SpeechService,
  ) {

  }

  ngOnInit(): void {

  }

  onLogoClick() {
    this.router.navigate(['/home'])
  }

  toggleSpeech(): void {
    this.speechEnabled = !this.speechEnabled

    if (this.speechEnabled) {

      this.speechService.speak('Hello . Pick your lucky card');
    } else {
    
      this.speechService.stop();
    }
  }


  ngOnDestroy(): void {

  }
}
