import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BreakpointService } from './breakpoint.service';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  private fontSize = 42


  constructor(private breakpointService: BreakpointService) {
    this.breakpointService.isMobile$.subscribe(isMobile => {
      if(isMobile) {
        this.fontSize = 24;
      }
    })
  }

  zoomIn() {
    this.fontSize += 2; // Increase font size
    this.updateFontSize();
  }

  zoomOut() {
    if (this.fontSize > 16) { // Prevent too small font size
      this.fontSize -= 2; // Decrease font size
      this.updateFontSize();
    }
  }

  reset() {
    this.fontSize = 42;
    this.updateFontSize();
  }

  private updateFontSize() {
    const section = document.getElementById('zoom-container');
    if (section) {
      section.setAttribute('style', `font-size: ${this.fontSize}px`);
    }
  }


}
