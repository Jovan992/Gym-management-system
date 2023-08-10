import { Injectable } from '@angular/core';
import { Settings } from '../models/settings.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  gymName: string = '';
  dateFormat: string = '';
  constructor(private http: HttpClient) {}

  /**
   * saving gym name to the gymName property
   * @param name Chosen gym name in the settings
   */
  setGymName(name: string) {
    this.gymName = name;
  }
  /**
   * saving date format in the dateFormat property
   * @param date Chosen date format in the app
   */
  setDateFormat(date: string) {
    this.dateFormat = date;
  }
  /**
   * getting gym name data and setting it to the gymName property
   */
  getGymName() {
    this.getSettings().subscribe({
      next: (data) => {
        this.setGymName(data[0].gymName);
      },
      error: (err) => {},
    });
  }
  /**
   * getting data about chosen format for the date and setting it in the property
   */
  getDateFormat() {
    this.getSettings().subscribe({
      next: (data) => {
        this.setDateFormat(data[0].dateFormat);
      },
      error: (err) => {},
    });
  }
  /**
   * getting settings array from database
   * @returns settings object array
   */
  getSettings() {
    return this.http.get<Settings[]>('http://localhost:3000/settings');
  }
  /**
   *
   * @param id Id of the settings object in the database
   * @param dataSettings edited settings object
   * @returns settings edited settings object
   */
  editSettings(id: number, dataSettings: Settings) {
    return this.http.put(`http://localhost:3000/settings/${id}`, dataSettings);
  }
}
