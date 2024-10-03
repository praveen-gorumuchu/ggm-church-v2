import { Injectable } from '@angular/core';
import { Config, DotLottie } from '@lottiefiles/dotlottie-web';

@Injectable({
  providedIn: 'root',
})
export class AnimationService {
  private animationsMap: Map<HTMLCanvasElement, DotLottie> = new Map(); // Track animations by canvas

  constructor() {}

  playAnimation(config: Config): void {
    this.stopAnimation(config); // Ensure any existing animation on this canvas is stopped
    this.clearCanvas(config);

    const dotLottie = new DotLottie({
      canvas: config?.canvas,
      src: config.src,
      autoplay: config?.autoplay ?? true, // Autoplay defaults to true if not provided
      loop: config?.loop ?? true,         // Loop defaults to true if not provided
    });

    this.animationsMap.set(config.canvas, dotLottie); // Store animation instance
    dotLottie.play();
  }

  stopAnimation(config: Config): void {
    const dotLottie = this.animationsMap.get(config.canvas);
    if (dotLottie) {
      dotLottie.stop();
      this.animationsMap.delete(config.canvas); // Remove the instance when stopped
    }
    this.clearCanvas(config);
  }

  private clearCanvas(config: Config): void {
    const context = config.canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, config.canvas.width, config.canvas.height);
    }
  }
}
