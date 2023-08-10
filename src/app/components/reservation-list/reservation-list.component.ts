import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { snackMessages } from 'src/app/shared/message';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationDialogComponent } from '../dialogs/reservation-dialog/reservation-dialog.component';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'date', 'place', 'start', 'end', 'slots', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    public _resService: ReservationService,
    public _settingsService: SettingsService,
    private _dialog: MatDialog,
    private _snackBar: MessageSnackbarService,
  ) { }

  ngOnInit(): void {
    this.getReservationsData();
    this._settingsService.getDateFormat();
  }

  /**
   * Get reservation data via reservationService,
   * set sorting and pagination for table
   */
  getReservationsData() {
    this._resService.getReservations().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res as any);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: () => { },
    });
  }

  /**
   * Delete reservation via reservationService
   * and display delete snackBar message
   * @param id id of reservation 
   * @param name name of reservation 
   * @param componentName parameter for targeting of db 
   */
  deleteReservation(id: number, name: string, componentName: string) {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        id: id, name: name, componentName: componentName
      },
    })

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getReservationsData()
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
   * Open reservation dialog component for adding new reservation
   * and display added snackBar message
   */
  openAddReservationDialog() {
    const dialogRef = this._dialog.open(ReservationDialogComponent, {
      autoFocus: false,
      panelClass: "g-dialog-responsive"
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getReservationsData();
          this._snackBar.openSnackBar(snackMessages.added);
        }
      },
    });
  }

  /** 
   * Open reservation dialog component for editing reservation
   * and display edited snackBar message
   */
  openEditReservationDialog(data: any) {
    const dialogRef = this._dialog.open(ReservationDialogComponent, {
      data,
      autoFocus: false,
      panelClass: "g-dialog-responsive"
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getReservationsData();
          this._snackBar.openSnackBar(snackMessages.edited);
        }
      },
    });
  }
}
