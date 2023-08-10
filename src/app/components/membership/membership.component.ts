import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Membership } from 'src/app/models/membership.model';
import { MembershipService } from 'src/app/services/membership.service';
import { MembershipDialogComponent } from '../dialogs/membership-dialog/membership-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { snackMessages } from 'src/app/shared/message';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css'],
})
export class MembershipComponent implements AfterViewInit, OnInit {
  memberships: Membership[] = [];

  defaultMemberships = [
    'Gold Membership',
    'Silver Membership',
    'Bronze Membership',
    'Student Membership',
  ];
  displayedColumns: string[] = [
    'photo',
    'membershipName',
    'period',
    'price',
    'action',
  ];
  dataSource: MatTableDataSource<Membership>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  /**
   * Gets membership data from the database and fills the table
   */
  getMembershipData() {
    this.membershipService.getMemberships().subscribe({
      next: (data) => {
        this.memberships = data;
        this.dataSource = new MatTableDataSource(this.memberships);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {},
    });
  }

  constructor(
    private membershipService: MembershipService,
    private _membersService: MembersService,
    private _snackBar: MessageSnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getMembershipData();
  }

  /**
   * Filter table by user input
   * @param event user input
   */

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Provides data to the delete dialog about membership objects that gets removed
   * @param id Id of the membership object that gets removed
   * @param name Membership type that gets removed
   * @param componentName Name of the component from which object gets removed
   */
  onRemoveMembership(id: number, name: string, componentName: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id: id,
        name: name,
        componentName: componentName,
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMembershipData();
          this._membersService.getMembers().subscribe({
            next: (members) => {
              var containsActiveMember: boolean;
              var membersList = members as any[];
              membersList.forEach((member) => {
                if (member.membershipType === name) {
                  containsActiveMember = true;
                  var newData = {
                    photo: member.photo,
                    name: member.name,
                    surname: member.surname,
                    phoneNumber: member.phoneNumber,
                    email: member.email,
                    joiningDate: member.joiningDate,
                    membershipType: '',
                    id: member.id,
                  };
                  this._membersService
                    .editMember(member.id, newData)
                    .subscribe({
                      next: () => {},
                      error: () => {},
                    });
                }
                if (containsActiveMember) {
                  this._snackBar.openSnackBar(
                    snackMessages.membershipWithMembersDeleted
                  );
                } else {
                  this._snackBar.openSnackBar(snackMessages.deleted);
                }
              });
            },
          });
        }
      },
      error: (err) => {},
    });
  }
  /**
   * Provides data to the edit dialog about membership object that gets edited
   * @param data Membership object data that gets edited
   */
  onEditMembership(data: any) {
    const dialogRef = this.dialog.open(MembershipDialogComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMembershipData();
          this._snackBar.openSnackBar(snackMessages.edited);
        }
      },
      error: (err) => {},
    });
  }
  /**
   * Opens dialog for adding new membership
   */
  openAddMembershipDialog() {
    const dialogRef = this.dialog.open(MembershipDialogComponent, {
      autoFocus: false,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMembershipData();
          this._snackBar.openSnackBar(snackMessages.added);
        }
      },
      error: (err) => {},
    });
  }
}
