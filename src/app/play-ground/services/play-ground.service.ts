import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QuizNavigationStatus } from '../model/quiz-navigation.model';
import { D } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root'
})
export class PlayGroundService {

  constructor(private http: HttpClient) { }

  private navigationObs$ = new Subject<QuizNavigationStatus>();
  readonly navigationObsCast$ = this.navigationObs$.asObservable();


  setNavigation(data: QuizNavigationStatus) {
      this.navigationObs$.next(data);
  }

  resetNavigation() {
    this.navigationObs$.complete();
    this.navigationObs$.unsubscribe()
  }

}
