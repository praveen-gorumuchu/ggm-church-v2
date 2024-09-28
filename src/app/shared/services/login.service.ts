import { EncriptionService } from './encription.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { environment as env } from '../../../environments/environment';
import { EndPointUrlConst } from '../constants/end-point-url.constant';
import { Subject, tap, Observable } from 'rxjs';
import { NumberConstant } from '../constants/number-constant';
import { UserDataList, UserList } from '../models/user-data/uder-list.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userList: UserList[] = [];
  loginUser!: UserList;

  private readonly userDataObs$ = new Subject<UserList[]>();
  readonly userDataObsCast$ = this.userDataObs$.asObservable();

  constructor(private http: HttpClient, private encriptionService: EncriptionService) {
    this.getUserData();
  }

  get baseUrl(): string {
    return `${env.apiUrl}/${EndPointUrlConst.GGM_MEM_KEY}`;
  }

  get userEndpint(): string {
    return `${this.baseUrl}/${EndPointUrlConst.USERS}/${EndPointUrlConst.USERS}.json`
  }

  getUserData(): Observable<UserDataList> {
    return this.http.get<any>(this.userEndpint);
  }

  setUserData(data: UserList[]) {
    this.userList = data;
    this.userDataObs$.next(data);
  }

  usernameValidator(control: AbstractControl): ValidationErrors | null {
    const username = control.value;
    const userExists = this.userList.find(user => user.name === username);
    if(userExists) this.loginUser = userExists;

    return userExists ? null : { inValid: true }; // Return error if user doesn't exist
  }


  passwordValidator(control: AbstractControl, username: string): ValidationErrors | null {
    if (!this.loginUser) return null;
    const password = control.value;
    const userKey = this.encriptionService.decrypt(this.loginUser.key);
    const isValid = password.toLowerCase() === userKey.toLowerCase();
    return isValid ? null : { inValid: true }; // Return error if invalid
  }


}
