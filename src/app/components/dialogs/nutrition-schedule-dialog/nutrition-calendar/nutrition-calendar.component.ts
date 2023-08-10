import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddEventDialogComponent } from '../../add-event-dialog/add-event-dialog.component';
import { NutritionScheduleService } from 'src/app/services/nutrition-schedule.service';
import { MessageSnackbarService } from 'src/app/services/message-snackbar.service';
import { snackMessages } from 'src/app/shared/message';

@Component({
  selector: 'app-nutrition-calendar',
  templateUrl: './nutrition-calendar.component.html',
  styleUrls: ['./nutrition-calendar.component.css'],
})
export class NutritionCalendarComponent implements OnInit {
  ngOnInit(): void {
    this.nutritionScheduleService.dailyMealSchedule.forEach((schedule) => {
      this.Events.push({ title: schedule.meal, date: schedule.date });
    });
    this.calendarOptions.dateClick = this.onDateClick.bind(this);
    this.calendarOptions.events = this.Events;
    this.calendarOptions.eventClick = this.onEventClick.bind(this);
  }
  constructor(
    private cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private nutritionScheduleService: NutritionScheduleService,
    private _snackBar: MessageSnackbarService
  ) {}

  /**
   * Finds mealSchedule in the database that corresponds to the clicked event and sends data to the meal form
   * @param data Event data that gets passed by clicking on the event in the calendar
   */
  onEventClick(data: any) {
    let mealEvent: any = this.nutritionScheduleService.dailyMealSchedule.find(
      (mealSch) => {
        return (
          mealSch.meal === data.event._def.title &&
          mealSch.date === data.event.startStr
        );
      }
    );
    this.dialog.open(AddEventDialogComponent, {
      autoFocus: false,
      width: '50%',
      data: mealEvent,
    });
  }

  Events: any[] = [];

  /**
   * If user clicked Add new schedule button it opens add event dialog on the calendar
   * @param res Calendar data
   * @returns
   */
  onDateClick(res: any) {
    if (this.nutritionScheduleService.buttonStatus === 'view') return;
    else this.openAddEventDialog(res.dateStr);
  }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },

    validRange: {
      start: new Date(),
      end: new Date().setFullYear(new Date().getFullYear() + 1),
    },

    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    plugins: [dayGridPlugin, interactionPlugin],
  };

  /**
   * Opens the dialog for adding mealSchedule in the calendar and adds this to the calendar events in order to show label on the selected date
   * @param date Date that is clicked on the calendar
   */
  openAddEventDialog(date: string) {
    const dialogRef = this.dialog.open(AddEventDialogComponent, {
      autoFocus: false,
      width: '50%',
      data: {
        date: date,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.Events = [];
          this.nutritionScheduleService.dailyMealSchedule.forEach((meal) => {
            this.Events.push({
              title: meal.meal,
              date: meal.date,
            });
          });
          this.Events = [...this.Events];
          this.cd.detectChanges();
          this.calendarOptions = {
            events: this.Events,
            eventClick: this.onEventClick.bind(this),
          };
          this._snackBar.openSnackBar(snackMessages.addedSchedule);
        }
      },
      error: (err) => {},
    });
  }
}
