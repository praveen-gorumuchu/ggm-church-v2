// sound.service.ts
import { Injectable } from '@angular/core';
import { Howl, HowlOptions } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private sounds: { [key: string]: Howl } = {};

  constructor() { }

  loadSound(key: string, config: HowlOptions): void {
    this.sounds[key] = new Howl({
      src: [config.src as string],
      volume: config.volume ? config.volume : 2.0, // Set the volume (0.0 to 1.0)
      autoplay: config.autoplay ? config.autoplay : false,
      loop: config.loop ? config?.loop : false
    });
  }

  playSound(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].play();
    }
  }

  stopSound(key: string): void {
    if (this.sounds[key]) {
      this.sounds[key].stop();
    }
  }

}
