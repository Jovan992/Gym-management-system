import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { snackMessages } from 'src/app/shared/message';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';
import { ClassScheduleDialogComponent } from '../dialogs/class-schedule-dialog/class-schedule-dialog.component';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { ScheduleCalendarDialogComponent } from '../dialogs/schedule-calendar-dialog/schedule-calendar-dialog.component';
import { SettingsService } from 'src/app/services/settings.service';
import { ScheduledClass } from 'src/app/models/scheduled.class';

@Component({
  selector: 'app-class-schedule',
  templateUrl: './class-schedule.component.html',
  styleUrls: ['./class-schedule.component.css']
})
export class ClassScheduleComponent {

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'trainer', 'location', 'start', 'end', 'date', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _classService: ClassScheduleService,
    private _snackBar: MessageSnackbarService,
    public _settingsService: SettingsService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this._settingsService.getDateFormat();
    this.getClassScheduleData();
  }

  /**
   * Get class schedule data via classService,
   * set sorting and pagination for table
   */
  getClassScheduleData() {
    this._classService.getClassSchedule().subscribe({
      next: (scheduledClass) => {
        var classScheduleDbData = scheduledClass as ScheduledClass[];

        this.dataSource = new MatTableDataSource(classScheduleDbData);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this._classService.classEvents = [];

        classScheduleDbData.forEach(element => {
          this._classService.mapClass(element);
        });
      },
      error: () => { },
    });
  }

  /**
   * Delete class schedule data via classService
   * and display delete snackBar message
   * @param id id of scheduled class 
   * @param name name of scheduled class 
   * @param componentName parameter for targeting of db 
   */
  deleteScheduledClass(id: number, name: string, componentName: string) {
    const dialogRef = this._dialog.open(DeleteDialogComponent, {
      data: {
        id: id, name: name, componentName: componentName
      },
    })

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClassScheduleData();
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
   * Open class dialog component for adding new class
   * and display added snackBar message
   */
  openAddClassDialog() {
    const dialogRef = this._dialog.open(ClassScheduleDialogComponent, {
      autoFocus: false,
      panelClass: "g-dialog-responsive"
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClassScheduleData();
          this._snackBar.openSnackBar(snackMessages.added);
        }
      },
    });
  }

  /** 
   * Open class dialog component for editing class
   * and display edited snackBar message
   */
  openEditClassDialog(data: any) {
    const dialogRef = this._dialog.open(ClassScheduleDialogComponent, {
      data,
      autoFocus: false,
      panelClass: "g-dialog-responsive"
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClassScheduleData();
          this._snackBar.openSnackBar(snackMessages.edited);
        }
      },
    });
  }

  /**
   * 
   */
  openClassSchedules() {
    const dialogRef = this._dialog.open(ScheduleCalendarDialogComponent, {
      autoFocus: false,
      panelClass: "g-dialog-responsive"
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getClassScheduleData();
        }
      },
    });
  }
}
