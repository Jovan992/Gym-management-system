import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StaffService } from 'src/app/services/staff.service';
import { MatDialog } from '@angular/material/dialog';
import { StaffDialogComponent } from '../dialogs/staff-dialog/staff-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { snackMessages } from 'src/app/shared/message';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['photo', 'name', 'surname', 'phone', 'role', 'email', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private _staffService: StaffService,
    private _dialog: MatDialog,
    private _snackBar: MessageSnackbarService,
  ) { }

  ngOnInit(): void {
    this.getStaffData();
  }

  /**
   * Get staff data via staffService,
   * set sorting and pagination for table
   */
  getStaffData() {
    this._staffService.getStaff().subscribe({
      next: (staff) => {
        this.dataSource = new MatTableDataSource(staff as any);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: () => { },
    });
  }

  /**
   * Delete staff via classService
   * and display delete snackBar message
   * @param id id of staff 
   * @param name name of staff 
   * @param componentName parameter for targeting of db 
   */
  deleteStaffMember(id: number, name: string, componentName: string) {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        id: id, name: name, componentName: componentName
      },
    })

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStaffData()
          this._snackBar.openSnackBar(snackMessages.deleted);
        }
      },
      error: (err) => { }
    })
  }

  /**
   * Filter table by user input
   * @param event user input
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** 
   * Open staff dialog component for adding new staff
   * and display added snackBar message
   */
  openAddStaffDialog() {
    const dialogRef = this._dialog.open(StaffDialogComponent, {
      autoFocus: false,
      panelClass: "g-dialog-responsive"
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStaffData();
          this._snackBar.openSnackBar(snackMessages.added);
        }
      },
    });
  }

  /** 
   * Open staff dialog component for editing staff
   * and display edited snackBar message
   */
  openEditStaffDialog(data: any) {
    const dialogRef = this._dialog.open(StaffDialogComponent, {
      data,
      autoFocus: false,
      panelClass: "g-dialog-responsive"
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStaffData();
          this._snackBar.openSnackBar(snackMessages.edited);
        }
      },
    });
  }
}


