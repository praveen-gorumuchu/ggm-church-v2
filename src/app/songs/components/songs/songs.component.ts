import { Component, OnInit } from '@angular/core';
import { StringConstant } from '../../../shared/constants/string-constant';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.scss'
})
export class SongsComponent implements OnInit {
  showPresentation: boolean = false;
  slidesUrl: string  | SafeResourceUrl= '';
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.slidesUrl = StringConstant.SLIDE_URL
    // this.slidesUrl = this.sanitizer.bypassSecurityTrustResourceUrl(StringConstant.SLIDE_URL);
  }


  openFullscreen() {
    this.showPresentation = true;
    const iframe = document.getElementById('presentation-frame') as HTMLIFrameElement;

    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    } else {
      console.error('Iframe element not found.');
    }
  }
}
