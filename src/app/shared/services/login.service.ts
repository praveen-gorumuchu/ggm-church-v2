import { EncriptionService } from './encription.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { environment as env } from '../../../environments/environment';
import { EndPointUrlConst } from '../constants/end-point-url.constant';
import { Subject, tap, Observable } from 'rxjs';
import { NumberConstant } from '../constants/number-constant';
import { UserDataList, UserInfo } from '../models/user-data/uder-list.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userList: UserInfo[] = [];
  loginUser!: UserInfo;

  private readonly loginUserObs$ = new Subject<UserInfo>();
  readonly loginUserObsCast$ = this.loginUserObs$.asObservable();
  private readonly userDataObs$ = new Subject<UserInfo[]>();
  readonly userDataObsCast$ = this.userDataObs$.asObservable();

  constructor(private http: HttpClient, private encriptionService: EncriptionService) {
    this.getUserData();
  }

  get baseUrl(): string {
    return `${env.apiUrl}/${EndPointUrlConst.GGM_DBS}`;
  }

  get userEndpint(): string {
    return `${this.baseUrl}/${EndPointUrlConst.USERS}/${EndPointUrlConst.USERS}.json`
  }

  getUserData(): Observable<UserDataList> {
    return this.http.get<any>(this.userEndpint);
  }

  setLoginUserInfo(data: UserInfo) {
    if (data) {
      this.loginUser = data;
      localStorage.setItem('userInfo', JSON.stringify(data));
      this.loginUserObs$.next(data);
    }

  }

  setUserData(data: UserInfo[]) {
    this.userList = data;
    this.userDataObs$.next(data);
  }

  usernameValidator(control: AbstractControl): ValidationErrors | null {
    const username = control.value;
    const userInfo = this.userList.find(user =>
      user.name.toLowerCase() === (username as string).trim().toLowerCase());
      if(userInfo) {
        this.setLoginUserInfo(userInfo);
      } 
    return userInfo ? null : { inValid: true }; // Return error if user doesn't exist
  }


  passwordValidator(control: AbstractControl, username: string): ValidationErrors | null {
    if (control && control.touched && !username) return null;
    const password = control.value;
    const userKey = this.encriptionService.decrypt(this.loginUser && this.loginUser.key);
    const isValid = password.toLowerCase() === userKey.toLowerCase();
    return isValid ? null : { inValid: true }; // Return error if invalid
  }


}
