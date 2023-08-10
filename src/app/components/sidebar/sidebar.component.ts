import { Component, ElementRef, ViewChild } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  host: {
    '(window:resize)': 'onResize($event)'
  }
})
export class SidebarComponent {

  /* State for toggling sidenav */
  closed: boolean;

  /* State for window width less than 701px */
  lessThan: boolean;

  @ViewChild('hamburger') hamburger: ElementRef<HTMLElement>;

  constructor(
    public settingsService: SettingsService
  ){}

  /**
   * Method for toggling sidebar 
   */
  toggle() {
    this.closed = !this.closed;
  }

  /**
   * Method for toggling sidebar depending on windows width
   */
  onResize(event: any) {
    if (event.target.innerWidth < 701) {
      this.closed = true;
      this.lessThan = true;
    } else {
      this.closed = false;
      this.lessThan = false;
    }
  }

  /**
   * Method for opening sidebar on sidebar mouse enter
   */
  mouseDrawerEnter() {
    if (this.closed) {
      this.closed = false;
    }
  }
  
  /**
   * Method for closing sidebar on sidebar mouse leave
   */
  mouseDrawerLeave() {
    if (!this.closed && this.lessThan) {
      this.closed = true;
    }
  }
}