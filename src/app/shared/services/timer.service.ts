import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timer$: Subject<number> = new Subject();
  private intervalId: NodeJS.Timeout | null = null; // Use NodeJS.Timeout for type safety
  private currentTime: number = 0;

  constructor() {}

  /**
   * Starts the timer with the specified number of seconds.
   * @param seconds - The number of seconds for the timer.
   */
  startTimer(seconds: number): void {
    if (this.intervalId) return; // Prevent starting multiple intervals

    this.currentTime = seconds;
    this.timer$.next(this.currentTime);

    this.intervalId = setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime--;
        this.timer$.next(this.currentTime);
      } else {
        this.stopTimer(); // Stop the timer when reaching zero
      }
    }, 1000);
  }

  /**
   * Stops the timer and prevents further emissions.
   */
  stopTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clear the interval to stop further calls
      this.intervalId = null;
    }
    if (this.currentTime !== 0) {
      this.currentTime = 0;
      this.timer$.next(this.currentTime); // Emit only once when stopping
    }
  }

  /**
   * Returns an observable for the timer value.
   * @returns An observable of the current timer value.
   */
  getTimer(): Observable<number> {
    return this.timer$.asObservable();
  }
}
