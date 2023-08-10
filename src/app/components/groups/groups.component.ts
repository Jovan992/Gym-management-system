import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/models/group';
import { GroupsService } from 'src/app/services/groups.service';
import { GroupsDialogComponent } from '../dialogs/groups-dialog/groups-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { snackMessages } from 'src/app/shared/message';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
})
export class GroupsComponent implements OnInit, AfterViewInit {
  constructor(
    private groupsService: GroupsService,
    private _classService: ClassScheduleService,
    private dialog: MatDialog,
    private _snackBar: MessageSnackbarService  ) { }
  ngOnInit(): void { }
  ngAfterViewInit(): void {
    this.getGroupsData();
  }
  groups: Group[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'photo',
    'groupName',
    'numberOfMembers',
    'action',
  ];

  dataSource: MatTableDataSource<Group>;

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
   * Provides data to the edit dialog about group object that gets edited
   * @param data Group object that gets edited
   */
  onEditGroup(data: any) {
    const dialogRef = this.dialog.open(GroupsDialogComponent, {
      data,
      width: '50%',
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this._classService.editGroupInClass(data);
          this.getGroupsData();
          this._snackBar.openSnackBar(snackMessages.edited);
        }
      },
      error: (err) => { },
    });
  }

  /**
   * Opens add dialog for adding a new group
   */
  openAddGroupDialog() {
    const dialogRef = this.dialog.open(GroupsDialogComponent, {
      autoFocus: false,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getGroupsData();
          this._snackBar.openSnackBar(snackMessages.added);
        }
      },
      error: (err) => { },
    });
  }

  /**
   * Provides data to the delete dialog about group objects that gets removed
   * @param id Id of the group that gets removed
   * @param name Name of the group that gets removed
   * @param componentName Component from which data gets removed
   */
  onRemoveGroup(id: number, name: string, componentName: string) {
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
          this.getGroupsData();
          this._snackBar.openSnackBar(snackMessages.deleted);
        }
      }
    });
  }

  /**
   * Gets groups data from the database and fills the table
   */
  getGroupsData() {
    this.groupsService.getGroups().subscribe({
      next: (data) => {
        this.groups = data;
        this.dataSource = new MatTableDataSource(this.groups);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => { },
    });
  }
}
