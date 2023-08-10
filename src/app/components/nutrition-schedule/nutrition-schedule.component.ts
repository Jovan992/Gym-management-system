import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Nutrition } from 'src/app/models/nutrition.model';
import { NutritionScheduleService } from 'src/app/services/nutrition-schedule.service';
import { NutritionScheduleDialogComponent } from '../dialogs/nutrition-schedule-dialog/nutrition-schedule-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { snackMessages } from 'src/app/shared/message';

@Component({
  selector: 'app-nutrition-schedule',
  templateUrl: './nutrition-schedule.component.html',
  styleUrls: ['./nutrition-schedule.component.css'],
})
export class NutritionScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  nutritionSchedule: Nutrition[] = [];
  dataSource: any;
  displayedColumns: string[] = [
    'memberPhoto',
    'memberName',
    'nutritionGoal',
    'action',
  ];
  constructor(
    private nutritionScheduleService: NutritionScheduleService,
    private dialog: MatDialog,
    private _snackBar: MessageSnackbarService
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.getNutritionSchedule();
  }

  /**
   * Gets nutrition schedule from the database and fills the table with the data
   */
  getNutritionSchedule() {
    this.nutritionScheduleService.getNutritionSchedule().subscribe({
      next: (data) => {
        this.nutritionSchedule = data;
        this.dataSource = new MatTableDataSource(this.nutritionSchedule);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  /**
   * Opens add dialog for adding a new nutrition schedule
   */
  openAddNutritionScheduleDialog() {
    this.nutritionScheduleService.resetMeal();
    const dialogRef = this.dialog.open(NutritionScheduleDialogComponent, {
      autoFocus: false,
      width: '50%',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getNutritionSchedule();
        }
      },
      error: (err) => {},
    });
  }

  /**
   * Opens nutritionScheduleDialog with corresponding data
   * @param scheduleData Data about nutritionSchedule which is sent to the opening dialog
   * @param status Information about button that is pressed - view button disables editing information about presented nutrition
   */
  viewNutrition(scheduleData: any, status: string) {
    const dialogRef = this.dialog.open(NutritionScheduleDialogComponent, {
      autoFocus: false,
      width: '50%',
      data: {
        data: scheduleData,
        status: status,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.nutritionScheduleService.buttonStatus = '';
      },
      error: (err) => {},
    });
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
}
