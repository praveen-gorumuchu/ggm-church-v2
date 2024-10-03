// sound.service.ts
import { Injectable } from '@angular/core';
import { Howl } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  private sounds: { [key: string]: Howl } = {};

  constructor() {}

  loadSound(key: string, src: string): void {
    this.sounds[key] = new Howl({
      src: [src],
      volume: 3.0, // Set the volume (0.0 to 1.0)
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
