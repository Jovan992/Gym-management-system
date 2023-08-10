import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MembersService } from 'src/app/services/members.service';
import { SettingsService } from 'src/app/services/settings.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { NutritionScheduleService } from 'src/app/services/nutrition-schedule.service';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: LOCALE_ID, useValue: 'en-US' },
  ],
})
export class MemberDialogComponent implements OnInit {
  membersForm: FormGroup;
  minDate: Date;
  maxDate: Date;

  // img file
  file: any;
  imgData: string | ArrayBuffer | null;

  // membership period options
  membershipTypes: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DateAdapter) public dateFormatSecond: any,
    private membersService: MembersService,
    private dialogRef: MatDialogRef<MemberDialogComponent>,
    public settingsService: SettingsService,
    private nutritionScheduleService: NutritionScheduleService
  ) {}

  /**
   * Defines form control and validators for member form
   */
  createMemberForm() {
    this.membersForm = new FormGroup({
      photo: new FormControl(this.imgData, Validators.required),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      joiningDate: new FormControl('', Validators.required),
      membershipType: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.settingsService.dateFormat === 'DD/MM/YYYY') {
      this.dateFormatSecond.locale = 'en-GB';
    }
    let currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 23, 0, 1);
    this.maxDate = new Date();

    this.membersService.getMembershipTypes(this.membershipTypes);
    this.createMemberForm();

    this.membersForm.patchValue(this.data);
    if (this.data) {
      this.imgData = this.data.photo;
    }
  }

  /**
   * Gets selected photo and puts it in the form
   * @param event File selected
   */
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imgData = reader.result;
      let imgFormData = {
        photo: this.imgData,
      };
      this.membersForm.patchValue(imgFormData);
    };
    reader.readAsDataURL(this.file);
  }

  /**
   * Submits the data about edited or new member
   */
  onSubmit() {
    this.membersForm.markAllAsTouched();
    if (this.membersForm.valid) {
      if (this.data?.id) {
        // edit data
        this.membersService
          .editMember(this.data.id, this.membersForm.value)
          .subscribe({
            next: (editedValue) => {
              this.nutritionScheduleService.updateNutritionSchedule(
                this.data.id,
                this.membersForm.value
              );
              this.dialogRef.close(true);
            },
            error: () => {},
          });
      } else {
        // add new data - save button
        if (this.imgData) {
          this.membersService.addMember(this.membersForm.value).subscribe({
            next: (value) => {
              this.dialogRef.close(true);
            },
            error: () => {},
          });
        }
      }
    }
  }
}
