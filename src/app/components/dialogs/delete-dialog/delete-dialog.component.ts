import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountantService } from 'src/app/services/accountant.service';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { GroupsService } from 'src/app/services/groups.service';
import { MembersService } from 'src/app/services/members.service';
import { MembershipService } from 'src/app/services/membership.service';
import { NutritionScheduleService } from 'src/app/services/nutrition-schedule.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { StaffService } from 'src/app/services/staff.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private membershipService: MembershipService,
    private staffService: StaffService,
    private _classService: ClassScheduleService,
    private membersService: MembersService,
    private nutritionScheduleService: NutritionScheduleService,
    private _resService: ReservationService,
    private _accService: AccountantService,
    private groupsService: GroupsService
  ) {}

  nameForDeletion: string;
  idForDeletion: number;
  componentForDeletion: string;

  ngOnInit(): void {
    this.nameForDeletion = this.data.name;
    this.idForDeletion = this.data.id;
    this.componentForDeletion = this.data.componentName;
  }
  /**
   * Deletes membership from the database
   */
  deleteMembership() {
    this.membershipService.deleteMembership(this.idForDeletion).subscribe({
      next: (value) => {
        this.dialogRef.close(true);
      },
      error: () => {},
    });
  }
  /**
   * deletes staff from the database
   */
  deleteStaff() {
    this.staffService.deleteStaff(this.idForDeletion).subscribe({
      next: (value) => {
        this.dialogRef.close(true);
      },
      error: () => {},
    });
  }
  /**
   * Deletes class from the database
   */
  deleteClass() {
    this._classService.deleteClass(this.idForDeletion).subscribe({
      next: (value) => {
        this.dialogRef.close(true);
      },
      error: () => {},
    });
  }

  /**
   * Deletes member from database (finds and deleted nutrition schedule as well as group or member from the group)
   */
  deleteMember() {
    this.membersService.deleteMember(this.idForDeletion).subscribe({
      next: (value) => {
        this.nutritionScheduleService.removeNutritionBasedOnMember(
          this.idForDeletion
        );
        this.groupsService.removeMemberInTheGroup(this.idForDeletion);
        this.dialogRef.close(true);
      },
      error: () => {},
    });
  }

  /**
   * Deletes reservation from database
   */
  deleteReservation() {
    this._resService.deleteReservation(this.idForDeletion).subscribe({
      next: (value) => {
        this.dialogRef.close(true);
      },
      error: () => {},
    });
  }

  /**
   * Deletes reservation from database
   */
  deleteAccountant() {
    this._accService.deleteAccountant(this.idForDeletion).subscribe({
      next: (value) => {
        this.dialogRef.close(true);
      },
      error: () => {},
    });
  }

  /**
   * Deletes group from database
   */

  deleteGroup() {
    this.groupsService.deleteGroup(this.idForDeletion).subscribe({
      next: (value) => {
        this._classService.removeGroupFromClass(this.idForDeletion);

        this.dialogRef.close(true);
      },
      error: (err) => {},
    });
  }

  /**
   * Deletes data depending on the component
   */
  onDeleteData() {
    switch (this.componentForDeletion) {
      case 'membership':
        this.deleteMembership();
        break;
      case 'staff':
        this.deleteStaff();
        break;
      case 'class':
        this.deleteClass();
        break;
      case 'members':
        this.deleteMember();
        break;
      case 'reservations':
        this.deleteReservation();
        break;
      case 'accountant':
        this.deleteAccountant();
        break;
      case 'groups':
        this.deleteGroup();
        break;
    }
  }
}
