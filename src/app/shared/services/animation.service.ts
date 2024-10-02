import { Injectable } from '@angular/core';
import { Config, DotLottie } from '@lottiefiles/dotlottie-web';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private dotLottie: DotLottie | null = null;

  constructor() { }

  playAnimation(config: Config): void {
    this.stopAnimation(config);
    this.clearCanvas(config);
    this.dotLottie = new DotLottie({
      canvas: config.canvas,
      src: config.src,
      autoplay: config?.autoplay ? config.autoplay : true,
      loop: config?.loop ? config.loop : true,
    });
    this.dotLottie.play();
  }

  stopAnimation(config: Config): void {
    if (this.dotLottie) {
      this.dotLottie.stop();
      this.dotLottie = null;
    }
    this.clearCanvas(config)
  }
  private clearCanvas(config: Config): void {
    const context = config.canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, config.canvas.width, config.canvas.height);
    }
  }

}
