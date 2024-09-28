import { LoginService } from './../../shared/services/login.service';
import { FormsService } from './../../shared/services/forms.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { StringConstant } from '../../shared/constants/string-constant';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { FromInputConstant } from '../../shared/constants/from-input-constant';
import { UserDataList } from '../../shared/models/user-data/uder-list.model';
import { NumberConstant } from '../../shared/constants/number-constant';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  title: string = '';
  des: string = '';
  form!: FormGroup;
  formInputConst = FromInputConstant;
  passwordVisible = false;
  
  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private formsService: FormsService,
    private loginService: LoginService) {
    this.title = StringConstant.LOGIN_TITLE;
    this.des = StringConstant.LOGIN_DES;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      this.userData();
    }
    this.fName.valueChanges.pipe(
      debounceTime(NumberConstant.TWO_HUNDERED),
      distinctUntilChanged())
      .subscribe((userName: string | any) => {
        this.fName.updateValueAndValidity();
        this.setPasswordValidator();
      })
  }

  userData() {
    this.loginService.getUserData().subscribe((data: UserDataList) => {
      if (data && data.users && data.users.length > NumberConstant.ZERO) {
        this.loginService.setUserData(data.users);
        this.fName.setValidators([Validators.required, this.loginService.usernameValidator.bind(this.loginService)]);
        this.fName.updateValueAndValidity();

      }
    })
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.authService.login();
    localStorage.setItem('login', JSON.stringify(true));
    this.router.navigate(['/home']);
  }

  get passWordError(): string {
    return this.formsService.setErrors(this.password, FromInputConstant.inValidPassword);
  }

  get emailError(): string {
    return this.formsService.setErrors(this.email);
  }

  get nameError(): string {
    return this.formsService.setErrors(this.fName, FromInputConstant.inValidUser);
  }

  get password(): AbstractControl {
    return this.form.get('password') as AbstractControl
  }


  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl
  }

  get fName(): AbstractControl {
    return this.form.get('fName') as AbstractControl
  }

  setPasswordValidator() {
    this.password.setValidators([
      Validators.required,
      (control: AbstractControl): ValidationErrors | null =>
        this.loginService.passwordValidator(control, this.fName.value)
    ]);
    this.password.updateValueAndValidity();
  }


  createForm(): FormGroup {
    return this.fb.group({
      fName: ['', [Validators.required]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]]
    })
  }

}


