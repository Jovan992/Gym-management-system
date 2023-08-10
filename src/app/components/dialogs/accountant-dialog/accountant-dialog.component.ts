import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import { AccountantService } from 'src/app/services/accountant.service';

@Component({
  selector: 'app-accountant-dialog',
  templateUrl: './accountant-dialog.component.html',
  styleUrls: ['./accountant-dialog.component.css']
})
export class AccountantDialogComponent {

  accountantDialogForm: FormGroup;
  myImage!: any;
  base64code!: any;
  base_avatar: string = "assets/icons/base_avatar.png";

  constructor(
    private _fb: FormBuilder,
    private _accService: AccountantService,
    private _dialogRef: MatDialogRef<AccountantDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.buildAccountantDialogForm();
    this.accountantDialogForm.patchValue(this.data);
    if (this.data) {
      this.myImage = this.data.photo;
    } else {
      this.myImage = this.base_avatar;
      this.patchFormPhoto();
    }
  }


  /**
   * Create reactive form accountantDialogForm with required validator for all fields and
   * email validator
   */
  buildAccountantDialogForm() {
    this.accountantDialogForm = this._fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      phone: new FormControl(null, Validators.required),
      role: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      photo: new FormControl(this.myImage, Validators.required)
    })
  }

  /**
   * Set accountant photo 
   */
  patchFormPhoto() {
    let data = {
      photo: this.myImage
    }
    this.accountantDialogForm.patchValue(data);
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
   * Mark all form fields as touched. If form is valid, send data for adding or editing class via accountantService
   */
  onFormSubmit() {
    this.accountantDialogForm.markAllAsTouched();
    if (this.accountantDialogForm.valid) {
      if (this.data?.id) {
        this._accService.editAccountant(this.data.id, this.accountantDialogForm.value).subscribe({
          next: (value) => {
            this._dialogRef.close(true);
          },
          error: () => { },
        });
      } else {
        this._accService.addAccountant(this.accountantDialogForm.value).subscribe({
          next: (value) => {
            this._dialogRef.close(true);
          },
          error: () => { },
        })
      }
    }
  }
}
