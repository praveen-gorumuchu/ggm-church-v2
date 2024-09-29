import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppNavService {

  constructor() { }

  getChild(activatedRoute: ActivatedRoute): ActivatedRoute {
    if (activatedRoute.firstChild) return this.getChild(activatedRoute.firstChild);
    else return activatedRoute;
  }
}
