import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { startendtime } from 'src/app/shared/startendtime.validator';
import { ClassScheduleDialogComponent } from '../class-schedule-dialog/class-schedule-dialog.component';
import { ReservationService } from 'src/app/services/reservation.service';
import { SettingsService } from 'src/app/services/settings.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-reservation-dialog',
  templateUrl: './reservation-dialog.component.html',
  styleUrls: ['./reservation-dialog.component.css']
})
export class ReservationDialogComponent {
  reservationDialogForm: FormGroup;
  minDate: Date;
  maxDate: Date;

  constructor(
    private _fb: FormBuilder,
    private _resService: ReservationService,
    public _settingsService: SettingsService,
    private _dialogRef: MatDialogRef<ClassScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DateAdapter) public dateFormatSecond: any,
  ) { }

  ngOnInit(): void {
    if (this._settingsService.dateFormat === 'DD/MM/YYYY') {
      this.dateFormatSecond.locale = 'en-GB';
    }
    let currentYear = new Date().getFullYear();
    this.minDate = new Date();
    this.maxDate = new Date(currentYear + 10, 0, 0);
    this.buildReservationDialogForm();
    this.reservationDialogForm.patchValue(this.data);
  }

  /**
   * Create reactive form reservationDialogForm with required validator for all fields
   * and validator for checking end time validity (greather than start time)
   */
  buildReservationDialogForm() {
    this.reservationDialogForm = this._fb.group({
      name: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      place: new FormControl('', Validators.required),
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
      slots: new FormControl('', Validators.required),
    },
      {
        validators: startendtime
      }
    );
  }

  /**
   * Mark all form fields as touched. If form is valid, send data for adding or editing reservation via reservationsService
   */
  onFormSubmit() {
    this.reservationDialogForm.markAllAsTouched();

    if (this.reservationDialogForm.valid) {
      if (this.data?.id) {
        this._resService.editReservation(this.data.id, this.reservationDialogForm.value).subscribe({
          next: (value) => {
            this._dialogRef.close(true);
          },
          error: () => { },
        });
      } else {
        this._resService.addReservation(this.reservationDialogForm.value).subscribe({
          next: (value) => {
            this._dialogRef.close(true);
          },
          error: () => { },
        })
      }
    }
  }
}
