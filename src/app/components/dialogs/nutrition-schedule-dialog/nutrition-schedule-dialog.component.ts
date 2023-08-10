import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Nutrition } from 'src/app/models/nutrition.model';
import { MembersService } from 'src/app/services/members.service';
import { NutritionScheduleService } from 'src/app/services/nutrition-schedule.service';
import { MemberDialogComponent } from '../member-dialog/member-dialog.component';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { snackMessages } from 'src/app/shared/message';
import { Meal } from 'src/app/models/meal.model';

@Component({
  selector: 'app-nutrition-schedule-dialog',
  templateUrl: './nutrition-schedule-dialog.component.html',
  styleUrls: ['./nutrition-schedule-dialog.component.css'],
})
export class NutritionScheduleDialogComponent implements OnInit {
  nutritionScheduleForm: FormGroup;
  members = [
    {
      name: '',
      surname: '',
      id: 0,
    },
  ];
  constructor(
    private dialogRef: MatDialogRef<MemberDialogComponent>,
    private membersService: MembersService,
    private nutritionScheduleService: NutritionScheduleService,
    private _snackBar: MessageSnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getMemberNames();
    this.createNutritionScheduleForm();

    if (this.data) {
      this.nutritionScheduleForm.patchValue({
        memberName: this.data.data.memberName,
        nutritionGoal: this.data.data.nutritionGoal,
      });

      this.nutritionScheduleService.buttonStatus = this.data.status;
      this.nutritionScheduleForm.disable();
      this.nutritionScheduleService.dailyMealSchedule =
        this.data.data.nutritionPlan;
    }
  }

  /**
   * get data about existing members from members service - name, surname and id
   */
  getMemberNames() {
    this.membersService.getMembers().subscribe({
      next: (val) => {
        val.forEach((member, i) => {
          this.members[i] = {
            name: member.name,
            surname: member.surname,
            id: member.id,
          };
        });
      },
      error: (err) => {},
    });
  }

  /**
   * Defines form control and validators for nutrition schedule form
   */
  createNutritionScheduleForm() {
    this.nutritionScheduleForm = new FormGroup({
      memberName: new FormControl('', Validators.required),
      nutritionGoal: new FormControl('', Validators.required),
    });
  }

  /**
   * adds new nutrition schedule object to the database
   * @param data Nutrition object created based on form data
   */
  addNewSchedule(data: Nutrition) {
    this.nutritionScheduleService.addNutritionSchedule(data).subscribe({
      next: (val) => {
        this._snackBar.openSnackBar(snackMessages.added);
        this.dialogRef.close(true);
      },
      error: (err) => {
        this._snackBar.openSnackBar(snackMessages.failed),
          this.dialogRef.close(true);
      },
    });
  }

  /**
   * creates nutrition object based on submitted form, assignes corresponding photo to the member in nutrition schedule table based on the id in the members database
   * @param data schedule form submitted data
   */
  createMemberNutritionObject(data: any) {
    const memberId = +data.memberName.split(' ').pop();
    const memberName = data.memberName.split(' ').slice(0, 2).join(' ');
    const nutritionGoal = data.nutritionGoal;
    // this.nutritionPlan.push(this.nutritionScheduleService.meal);
    this.membersService.getMembers().subscribe({
      next: (val) => {
        let member = val.find((element) => element.id === memberId);
        let memberNutrition = new Nutrition(
          member?.photo,
          memberName,
          nutritionGoal,
          this.nutritionScheduleService.dailyMealSchedule,
          memberId
        );
        this.addNewSchedule(memberNutrition);
        this.nutritionScheduleService.resetMeal();
      },
      error: (err) => {},
    });
  }

  /**
   * submits form
   */
  onSubmit() {
    this.nutritionScheduleForm.markAllAsTouched();

    if (
      this.nutritionScheduleForm.valid &&
      this.nutritionScheduleService.dailyMealSchedule.length > 0
    )
      this.createMemberNutritionObject(this.nutritionScheduleForm.value);
    else {
      if (this.nutritionScheduleService.dailyMealSchedule.length === 0)
        this._snackBar.openSnackBar(snackMessages.requiredSchedule);
      return;
    }
  }
}
