import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {
  constructor(
    public settingsService: SettingsService,
    public _authService: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
    this.settingsService.getGymName();
  }

  signOut() {
    this._authService.setLogged(false);
    this._router.navigate(['login']);
  }
}
