import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffService } from 'src/app/services/staff.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';

@Component({
  selector: 'app-staff-dialog',
  templateUrl: './staff-dialog.component.html',
  styleUrls: ['./staff-dialog.component.css']
})
export class StaffDialogComponent implements OnInit {

  staffDialogForm: FormGroup;
  myImage!: any;
  base64code!: any;
  base_avatar: string = "assets/icons/base_avatar.png";

  constructor(
    private _fb: FormBuilder,
    private _staffService: StaffService,
    private _classService: ClassScheduleService,
    private _dialogRef: MatDialogRef<StaffDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.buildStaffDialogForm();
    this.staffDialogForm.patchValue(this.data);
    if (this.data) {
      this.myImage = this.data.photo;
    } else {
      this.myImage = this.base_avatar;
      this.patchFormPhoto();
    }
  }


  /**
   * Create reactive form staffialogForm with required validator for all fields and
   * email validator
   */
  buildStaffDialogForm() {
    this.staffDialogForm = this._fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      phone: new FormControl(null, Validators.required),
      role: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      photo: new FormControl(this.myImage, Validators.required)
    })
  }

  /**
   * Set user photo 
   */
  patchFormPhoto() {
    let data = {
      photo: this.myImage
    }
    this.staffDialogForm.patchValue(data);
  }

  /**
   * Take first file from input 
   */
  onChange = ($event: Event) => {
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertToBase64(file);
  }

  /**
   * Convert file to base64 format 
   */
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber)
    })
    observable.subscribe((d) => {
      this.myImage = d;
      this.base64code = d;
      this.patchFormPhoto();
    })
  }

  /**
   * Read file from input 
   */
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file)
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete()
    }
    filereader.onerror = () => {
      subscriber.error()
      subscriber.complete()
    }
  }

  /**
   * Mark all form fields as touched. If form is valid, send data for adding or editing class via staffService
   */
  onFormSubmit() {
    this.staffDialogForm.markAllAsTouched();
    if (this.staffDialogForm.valid) {
      if (this.data?.id) {
        this._staffService.editStaff(this.data.id, this.staffDialogForm.value).subscribe({
          next: (value) => {
            this._dialogRef.close(true);
            var trainer = this.data.name + " " + this.data.surname;
            this._classService.getClassSchedule().subscribe({
              next: (classSchedule) => {
                var classList = classSchedule as any[];
                classList.forEach(element => {
                  if (element.trainer === trainer) {
                    var newData = {
                      name: element.name,
                      trainer: this.staffDialogForm.value.name + " " + this.staffDialogForm.value.surname,
                      start: element.start,
                      end: element.end,
                      location: element.location,
                    };
                    this._classService.editClass(element.id, newData).subscribe({
                      next: () => { },
                      error: () => { }
                    });
                  }
                });
              }
            })
          },
          error: () => { },
        });
      } else {
        this._staffService.addStaff(this.staffDialogForm.value).subscribe({
          next: (value) => {
            this._dialogRef.close(true);
          },
          error: () => { },
        })
      }
    }
  }
}
