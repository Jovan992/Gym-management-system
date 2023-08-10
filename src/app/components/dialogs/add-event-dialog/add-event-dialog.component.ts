import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NutritionScheduleService } from 'src/app/services/nutrition-schedule.service';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';

@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css'],
})
export class AddEventDialogComponent implements OnInit {
  mealForm: FormGroup;

  /**
   * Defines form control and validators for mealform
   */
  createMealForm() {
    this.mealForm = new FormGroup({
      meal: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      mealDetails: new FormControl('', Validators.required),
    });
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private nutritionScheduleService: NutritionScheduleService,
    private dialogRef: MatDialogRef<MemberDialogComponent>
  ) {}

  ngOnInit(): void {
    this.createMealForm();
    this.mealForm.patchValue(this.data);
    this.mealForm.controls['date'].disable();
    if (this.data.meal) {
      this.mealForm.disable();
    }
  }

  /**
   * Submits the data about meal schedule and adds mealSchedule to the array in the service
   */
  onSubmit() {
    this.mealForm.markAllAsTouched();
    if (this.mealForm.valid) {
      this.mealForm.value.date = this.data.date;
      this.nutritionScheduleService.getMeal(this.mealForm.value);
      this.dialogRef.close(true);
    }
  }
}
