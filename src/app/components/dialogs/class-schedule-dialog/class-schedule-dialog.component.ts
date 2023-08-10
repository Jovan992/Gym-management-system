import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { staffMember } from 'src/app/models/staff';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { SettingsService } from 'src/app/services/settings.service';
import { StaffService } from 'src/app/services/staff.service';
import { startendtime } from 'src/app/shared/startendtime.validator';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import * as moment from 'moment';

@Component({
  selector: 'app-class-schedule-dialog',
  templateUrl: './class-schedule-dialog.component.html',
  styleUrls: ['./class-schedule-dialog.component.css'],
  providers: [
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { strict: true } }
  ]

})
export class ClassScheduleDialogComponent implements OnInit {
  classDialogForm: FormGroup;
  minDate: Date;
  maxDate: Date;
  trainersList: staffMember[];

  constructor(
    private _fb: FormBuilder,
    private _classService: ClassScheduleService,
    private _staffService: StaffService,
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
    this.buildClassDialogForm();
    this.classDialogForm.patchValue(this.data);
    this.getTrainersList();
  }

  /**
   * Create reactive form classDialogForm with required validator for all fields
   * and validator for checking end time validity (greather than start time)
   */
  buildClassDialogForm() {
    this.classDialogForm = this._fb.group({
      name: new FormControl('', Validators.required),
      trainer: new FormControl('', Validators.required),
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
    },
      {
        validators: startendtime,
      }
    );
  }

  /**
   * Get list of trainers (staff) via staffService
   */
  getTrainersList() {
    this._staffService.getStaff().subscribe({
      next: (staff) => {
        this.trainersList = staff as staffMember[];
      },
      error: () => { },
    });
  }

  /**
   * Mark all form fields as touched. If form is valid, formats date and send data for adding or editing class via classService
   */
  onFormSubmit() {
    this.classDialogForm.markAllAsTouched();

    if (this.classDialogForm.valid) {
      this.classDialogForm.controls['date'].setValue(moment(this.classDialogForm.controls['date'].value).format());
      if (this.data?.id) {
        this._classService
          .editClass(this.data.id, this.classDialogForm.value)
          .subscribe({
            next: (value) => {
              this._dialogRef.close(true);
            },
            error: () => { },
          });
      } else {
        this._classService.addClass(this.classDialogForm.value).subscribe({
          next: (value) => {
            this._dialogRef.close(true);
          },
          error: () => { },
        });
      }
    }
  }
}
