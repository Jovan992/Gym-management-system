import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MembershipDialogComponent } from '../membership-dialog/membership-dialog.component';
import { GroupsService } from 'src/app/services/groups.service';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Members } from 'src/app/models/members.model';
import { MembersService } from 'src/app/services/members.service';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { snackMessages } from 'src/app/shared/message';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-groups-dialog',
  templateUrl: './groups-dialog.component.html',
  styleUrls: ['./groups-dialog.component.css'],
})
export class GroupsDialogComponent implements OnInit {
  availableMembers: Members[] = [];
  groupAssignedMembers: Members[] = [];
  allAssignedMembers: Members[] = [];
  allowedNumberOfMembers: number;
  allowAddingGroup: boolean;

  /**
   * Moving items from list to list
   * @param event drag event for the list
   */
  drop(event: CdkDragDrop<Members[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MembershipDialogComponent>,
    private groupsService: GroupsService,
    private membersService: MembersService,
    private _snackBar: MessageSnackbarService
  ) {}

  groupForm: FormGroup;
  groupId: number = 0;

  // img file
  file: any;
  imgData: string | ArrayBuffer | null;

  /**
   * Defines form control and validators for group form
   * @param maximum Maximum number of members allowed in the field
   */
  createGroupForm(maximum: number) {
    this.groupForm = new FormGroup({
      groupName: new FormControl('', Validators.required),
      numberOfMembers: new FormControl('', [
        Validators.required,
        Validators.min(2),
        Validators.max(this.allowedNumberOfMembers),
      ]),
      photo: new FormControl(this.imgData, Validators.required),
    });
    this.groupForm.patchValue(this.data);
  }

  ngOnInit(): void {
    this.createGroupForm(this.allowedNumberOfMembers);
    this.getAllAssignedMembers();
    if (this.data) {
      this.imgData = this.data.photo;
      this.groupAssignedMembers = this.data.assignedMembers;
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
      this.groupForm.patchValue(imgFormData);
    };
    reader.readAsDataURL(this.file);
  }

  /**
   * gets All currently assinged members
   */
  getAllAssignedMembers() {
    this.allAssignedMembers = [];
    this.groupsService.getGroups().subscribe({
      next: (data) => {
        data.forEach((group) => {
          group.assignedMembers.forEach((assMember) =>
            this.allAssignedMembers.push(assMember)
          );
        });

        this.getAvailableMembers(this.allAssignedMembers);
      },
      error: (err) => {},
    });
  }

  /**
   * gets Available Members depending of the currently assigned members
   * @param assigned Array of currently assigned members
   */
  getAvailableMembers(assigned: Members[]) {
    this.membersService.getMembers().subscribe({
      next: (data) => {
        this.availableMembers = data.filter((member) =>
          assigned.every((assignedMember) => assignedMember.id !== member.id)
        );

        this.allowedNumberOfMembers =
          this.availableMembers.length + this.groupAssignedMembers.length > 20
            ? 20
            : this.availableMembers.length + this.groupAssignedMembers.length;
        this.createGroupForm(this.allowedNumberOfMembers);
        this.allowAddingGroup = this.allowedNumberOfMembers > 1 ? true : false;
      },
      error: (err) => {},
    });
  }

  /**
   * Adds new Group to the database
   * @param data Group object that gets added
   */
  addNewGroup(data: Group) {
    this.groupsService.addGroup(data).subscribe({
      next: (data) => {
        this._snackBar.openSnackBar(snackMessages.added);
        this.dialogRef.close(true);
      },
      error: (err) => {},
    });
  }

  /**
   * Creates Group object based on the data from the form and currently assigned Members in the group
   * @param data Data from group form that gets submitted
   * @returns Group object
   */
  createNewGroupObject(data: any) {
    const groupPhoto = data.photo;
    const groupName = data.groupName;
    const numberOfMembers = data.numberOfMembers;
    const assignedMembers = this.groupAssignedMembers;

    let newGroup = new Group(
      groupPhoto,
      groupName,
      numberOfMembers,
      assignedMembers,
      this.groupId++
    );
    return newGroup;
  }

  /**
   * Submits the group form, edits existing or adds a new Group
   */
  onSubmit() {
    this.groupForm.markAllAsTouched();
    if (this.groupForm.valid) {
      if (
        this.data?.id &&
        this.groupAssignedMembers.length ===
          this.groupForm.value.numberOfMembers
      ) {
        this.groupsService
          .editGroup(
            this.data.id,
            this.createNewGroupObject(this.groupForm.value)
          )
          .subscribe({
            next: (data) => {
              this.dialogRef.close(true);
            },
            error: (err) => {},
          });
      } else {
        if (
          this.groupAssignedMembers.length ===
          this.groupForm.value.numberOfMembers
        ) {
          this.addNewGroup(this.createNewGroupObject(this.groupForm.value));
          this.dialogRef.close(true);
        } else {
          this._snackBar.openSnackBar(snackMessages.requiredGroupMembers);
        }
      }
    }
  }
}
