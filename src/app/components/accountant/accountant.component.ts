import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { snackMessages } from 'src/app/shared/message';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { AccountantService } from 'src/app/services/accountant.service';
import { AccountantDialogComponent } from '../dialogs/accountant-dialog/accountant-dialog.component';

@Component({
  selector: 'app-accountant',
  templateUrl: './accountant.component.html',
  styleUrls: ['./accountant.component.css']
})
export class AccountantComponent {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['photo', 'name', 'surname', 'role', 'phone', 'email', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private _accService: AccountantService,
    private _dialog: MatDialog,
    private _snackBar: MessageSnackbarService,
  ) { }

  ngOnInit(): void {
    this.getAccountantsData();
  }

  /**
   * Get accountant data via accountantService,
   * set sorting and pagination for table
   */
  getAccountantsData() {
    this._accService.getAccountants().subscribe({
      next: (acc) => {
        this.dataSource = new MatTableDataSource(acc as any);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: () => { },
    });
  }

  /**
   * Delete accountant via accountantService
   * and display delete snackBar message
   * @param id id of accountant 
   * @param name name of accountant 
   * @param componentName parameter for targeting of db 
   */
  deleteAccountantMember(id: number, name: string, componentName: string) {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        id: id, name: name, componentName: componentName
      },
    })

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAccountantsData()
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
   * Open accountant dialog component for adding new accountant
   * and display added snackBar message
   */
  openAddAccountantDialog() {
    const dialogRef = this._dialog.open(AccountantDialogComponent, {
      autoFocus: false,
      panelClass: "g-dialog-responsive"
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAccountantsData();
          this._snackBar.openSnackBar(snackMessages.added);
        }
      },
    });
  }

  /** 
   * Open accountant dialog component for editing accountant
   * and display edited snackBar message
   */
  openEditAccountantDialog(data: any) {
    const dialogRef = this._dialog.open(AccountantDialogComponent, {
      data,
      autoFocus: false,
      panelClass: "g-dialog-responsive"
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAccountantsData();
          this._snackBar.openSnackBar(snackMessages.edited);
        }
      },
    });
  }
}
