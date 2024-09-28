import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {

  private drawerOpenSubject = new BehaviorSubject<boolean>(false);
  isDrawerOpen$ = this.drawerOpenSubject.asObservable();
  constructor() {}
  
  openDrawer() {
    this.drawerOpenSubject.next(true);
  }

  closeDrawer() {
    this.drawerOpenSubject.next(false);
  }

  toggleDrawer() {
    this.drawerOpenSubject.next(!this.drawerOpenSubject.value);
  }


}
