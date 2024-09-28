import { FormsService } from './../../shared/services/forms.service';
import { Component, OnInit, Pipe } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { StringConstant } from '../../shared/constants/string-constant';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  title: string = '';
  des: string = '';
  form!: FormGroup;
  passwordKey = 'ggmchurch@2001'
  constructor(private authService: AuthService, private router: Router,
    private fb: FormBuilder, private formsService: FormsService
  ) {
    this.title = StringConstant.LOGIN_TITLE;
    this.des = StringConstant.LOGIN_DES;
    this.form = this.createForm();
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);  // If already logged in, go to home
    }

  }

  onSubmit() {
    this.authService.login();
    localStorage.setItem('login', JSON.stringify(true));
    this.router.navigate(['/home']); // Redirect to dashboard after login
  }

  get passWordError(): string {
    return this.formsService.setErrors(this.password);
  }

  get emailError(): string {
    return this.formsService.setErrors(this.email);
  }

  get nameError(): string {
    return this.formsService.setErrors(this.fName);
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

  createForm(): FormGroup {
    return this.fb.group({
      fName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

}
