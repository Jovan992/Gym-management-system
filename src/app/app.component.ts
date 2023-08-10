import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gym-management';
  loggedIn: boolean;

  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.logged.subscribe((isLogged) => {
      this.loggedIn = isLogged;
    });
  }
}
