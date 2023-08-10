import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { matchpassword } from 'src/app/shared/matchpassword.validator';
import { snackMessages } from 'src/app/shared/message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  showPassword: boolean;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _snackBar: MessageSnackbarService
  ) { }

  ngOnInit(): void {
    this.buildRegisterForm();
    this._authService.getAccountsList();
  }

  /**
   * Create reactive form registerForm with required validator for all fields,
   * email validator and validator for matching passwords
   */
  buildRegisterForm() {
    this.registerForm = this._fb.group({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null)
    },
      {
        validators: matchpassword
      }
    );
  }

  /**
   * If registerForm is valid, reset form, show Successfully registered snackBar message 
   * and navigate to login page; if invalid, mark all field as touched
   */
  submitRegisterForm() {
    if (this.registerForm.valid) {
      this._authService.registerAcc(this.registerForm.value).subscribe({
        next: (res) => {
          this.registerForm.reset();
          this._snackBar.openSnackBar(snackMessages.registered);
          this._router.navigate(['login']);
        },
        error: (e) => { }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  /**
   * Check (on keyup event for username) in db for existing username
   * and set error and boolean for displaying error message
   */
  checkUsername() {
    if (this.registerForm.value.username !== "") {
      const duplicateUsername = this._authService.accounts.find(a =>
        this.registerForm.value.username == a.username);
      duplicateUsername ? this.registerForm.controls['username'].setErrors({ 'incorrect': true }) : this.registerForm.controls['username'].setErrors(null);
    }
  }
}
