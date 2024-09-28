import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timer$: Subject<number> = new Subject();
  private intervalId: any;
  private currentTime: number = 0;

  constructor() {}

  startTimer(seconds: number): void {
    this.currentTime = seconds;
    this.timer$.next(this.currentTime);
    
    this.intervalId = setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime--;
        this.timer$.next(this.currentTime);
      } else {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.intervalId);
    this.currentTime = 0;
    this.timer$.next(this.currentTime);
  }

  resetTimer(): void {
    this.stopTimer();
    this.currentTime = 0;
    this.timer$.next(this.currentTime);
  }

  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }
}
