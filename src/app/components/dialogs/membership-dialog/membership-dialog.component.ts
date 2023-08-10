import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MembersService } from 'src/app/services/members.service';
import { MembershipService } from 'src/app/services/membership.service';

@Component({
  selector: 'app-membership-dialog',
  templateUrl: './membership-dialog.component.html',
  styleUrls: ['./membership-dialog.component.css'],
})
export class MembershipDialogComponent implements OnInit {
  membershipForm: FormGroup;

  // img file
  file: any;
  imgData: string | ArrayBuffer | null;

  // membership period options
  periods: number[] = [30, 60, 90, 120, 180, 360];

  createMembershipForm() {
    this.membershipForm = new FormGroup({
      membershipName: new FormControl('', Validators.required),
      period: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(25)]),
      photo: new FormControl(this.imgData, Validators.required),
    });
  }

  ngOnInit(): void {
    this.createMembershipForm();
    this.membershipForm.patchValue(this.data);
    if (this.data) {
      this.imgData = this.data.photo;
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private membershipService: MembershipService,
    private _membersService: MembersService,
    private dialogRef: MatDialogRef<MembershipDialogComponent>
  ) {}

  /**
   * Gets selected image and puts it in the form
   * @param event File chosen
   */
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imgData = reader.result;
      let imgFormData = {
        photo: this.imgData,
      };
      this.membershipForm.patchValue(imgFormData);
    };
    reader.readAsDataURL(this.file);
  }
  /**
   * Submitting the data about edited or new membership
   */
  onSubmit() {
    this.membershipForm.markAllAsTouched();
    if (this.membershipForm.valid) {
      // edit data - update button
      if (this.data?.id) {
        this.membershipService
          .editMembership(this.data.id, this.membershipForm.value)
          .subscribe({
            next: (value) => {
              this.dialogRef.close(true);
              this._membersService.getMembers().subscribe({
                next: (members) => {
                  var membersList = members as any[];
                  membersList.forEach((member) => {
                    if (member.membershipType === this.data.membershipName) {
                      var newData = {
                        photo: member.photo,
                        name: member.name,
                        surname: member.surname,
                        phoneNumber: member.phoneNumber,
                        email: member.email,
                        joiningDate: member.joiningDate,
                        membershipType:
                          this.membershipForm.value.membershipName,
                        id: member.id,
                      };
                      this._membersService
                        .editMember(member.id, newData)
                        .subscribe({
                          next: () => {},
                          error: () => {},
                        });
                    }
                  });
                },
              });
            },
            error: () => {},
          });
      } else {
        // add new data - save button
        if (this.imgData) {
          this.membershipService
            .addMembership(this.membershipForm.value)
            .subscribe({
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
