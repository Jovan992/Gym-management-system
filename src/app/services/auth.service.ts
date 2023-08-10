import { Injectable } from '@angular/core';
import { Account } from '../models/account';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  logged = this.loggedSubject.asObservable();
  
  // Boolean for guard
  loggedIn: boolean;

  accounts: Account[];
  currentAccount: Account = {
    name: '',
    surname: '',
    email: '',
    phone: 0,
    password: '',
    username: '',
  };

  constructor(
    private _router: Router,
    private _http: HttpClient
  ) {
    this.logged.subscribe((isLogged) => {
      this.loggedIn = isLogged;
    });
  }





// Method for setting state of logged observable (boolean) 
setLogged = (value: boolean) => {
  this.loggedSubject.next(value);
}

/** 
 * Get list of registered accounts
 */
getAccountsList() {
  this._http.get("http://localhost:3000/accounts").subscribe({
    next: (acc) => {
      this.accounts = acc as Account[];
    },
    error: (err) => { }
  });
}

/** 
 * Log in user and send him to dashboard page
 */
logInAccount() {
  this.setLogged(true);
  this._router.navigate(['/dashboard']);
}

/** 
 * Post account in registered accounts in db
 */
registerAcc(acc: any) {
  return this._http.post("http://localhost:3000/accounts", acc)
}
}
