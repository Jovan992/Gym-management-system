import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { SettingsService } from 'src/app/services/settings.service';
import { snackMessages } from 'src/app/shared/message';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit, AfterViewInit {
  settingsForm: FormGroup;
  countries: string[] = ['Australia', 'France', 'USA', 'Germany'];
  dateFormats: string[] = ['DD/MM/YYYY', 'MM/DD/YYYY'];

  constructor(
    private settingsService: SettingsService,
    private snackBarService: MessageSnackbarService
  ) {}

  /**
   * Gets all settings data from database and prefilles the form
   */
  getSettingsData() {
    this.settingsService.getSettings().subscribe({
      next: (data) => {
        this.settingsForm.patchValue(data[0]);
      },
      error: (err) => {},
    });
  }

  /**
   * Defines form control values with validators
   */
  createSettingsForm() {
    this.settingsForm = new FormGroup({
      gymName: new FormControl('', Validators.required),
      establishmentDate: new FormControl('2000'),
      address: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateFormat: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    this.createSettingsForm();
  }
  ngAfterViewInit(): void {
    this.getSettingsData();
  }
  /**
   * Saves changes in the settings form
   */
  saveSettings() {
    if (this.settingsForm.valid) {
      this.settingsService.editSettings(1, this.settingsForm.value).subscribe({
        next: (val) => {
          this.settingsService.setGymName(this.settingsForm.value.gymName);
          this.settingsService.setDateFormat(
            this.settingsForm.value.dateFormat
          );
          this.snackBarService.openSnackBar(snackMessages.edited);
        },
        error: (err) => {},
      });
    }
  }
}
