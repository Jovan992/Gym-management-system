import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;
  showPassword: boolean;
  correctPassword: boolean;
  account: any;

  constructor(
    private _fb: FormBuilder,
    public _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.buildLogInForm();
    this._authService.getAccountsList();
    this._authService.setLogged(false);
  }

  /**
   * Create reactive form logInForm with required validator for all fields
   */
  buildLogInForm() {
    this.logInForm = this._fb.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  /**
   * If loginForm is valid, set current account and call logInAccount() from authService 
   */
  submitLogInForm() {
    this.checkExistingAccount();
    if (this.logInForm.valid) {
      this._authService.currentAccount = this.account;
      this._authService.logInAccount();
    }
  }

  /** 
   * Check db for account with username and password value from logInForm,
   * set errors for displaying error messages
   */
  checkExistingAccount() {
    this.logInForm.markAllAsTouched();

    if (this.logInForm.valid) {
      const userWithUSername = this._authService.accounts.find(a =>
        this.logInForm.value.username == a.username);
      if (userWithUSername) {
        this.logInForm.controls['username'].setErrors(null);
        if (this.logInForm.value.password === userWithUSername.password) {
          this.account = userWithUSername;
        } else {
          this.logInForm.controls['password'].setErrors({ 'incorrect': true });
        }
      } else {
        this.logInForm.controls['username'].setErrors({ 'incorrect': true });
      }
    }
  }
}