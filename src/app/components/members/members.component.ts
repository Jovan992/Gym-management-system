import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Members } from 'src/app/models/members.model';
import { MembersService } from 'src/app/services/members.service';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { MemberDialogComponent } from '../dialogs/member-dialog/member-dialog.component';
import { snackMessages } from 'src/app/shared/message';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { SettingsService } from 'src/app/services/settings.service';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent implements AfterViewInit, OnInit {
  constructor(
    private membersService: MembersService,
    private _snackBar: MessageSnackbarService,
    private _classService: ClassScheduleService,
    public settingsService: SettingsService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.settingsService.getDateFormat();
  }
  ngAfterViewInit(): void {
    this.getMembersData();
  }

  members: Members[] = [];

  displayedColumns: string[] = [
    'photo',
    'name',
    'surname',
    'phoneNumber',
    'email',
    'joiningDate',
    'membershipType',
    'action',
  ];
  dataSource: MatTableDataSource<Members>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
   * Provides data to the delete dialog about member objects that gets removed
   * @param id Id of the member that gets removed
   * @param name Name of the member that gets removed
   * @param componentName Component from which data gets removed
   */
  onRemoveMember(id: number, name: string, componentName: string) {
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
          this.getMembersData();
          this._snackBar.openSnackBar(snackMessages.deleted);
        }
      },
      error: (err) => {},
    });
  }

  /**
   * Provides data to the edit dialog about member object that gets edited
   * @param data Member object that gets edited
   */
  onEditMember(data: any) {
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      data,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this._classService.editMemberInClass(data);
          this.getMembersData();
          this._snackBar.openSnackBar(snackMessages.edited);
        }
      },
      error: (err) => {},
    });
  }
  /**
   * Opens add dialog for adding a new member
   */
  openAddMemberDialog() {
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      autoFocus: false,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getMembersData();
          this._snackBar.openSnackBar(snackMessages.added);
        }
      },
      error: (err) => {},
    });
  }

  /**
   * Gets member data from the database and fills the table
   */
  getMembersData() {
    this.membersService.getMembers().subscribe({
      next: (data) => {
        this.members = data;
        this.dataSource = new MatTableDataSource(this.members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {},
    });
  }
}
