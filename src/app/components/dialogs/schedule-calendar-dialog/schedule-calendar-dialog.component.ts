import { Component, signal } from '@angular/core';
import { CalendarOptions, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ClassScheduleService } from 'src/app/services/class-schedule.service';
import { MatDialog } from '@angular/material/dialog';
import { ClassScheduleCalendarEventComponent } from './class-schedule-calendar-event/class-schedule-calendar-event.component';

@Component({
  selector: 'app-schedule-calendar-dialog',
  templateUrl: './schedule-calendar-dialog.component.html',
  styleUrls: ['./schedule-calendar-dialog.component.css']
})
export class ScheduleCalendarDialogComponent {

  classEvents: {}[] = this._classService.classEvents;

  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.classEvents,
    editable: true,
    eventStartEditable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(
    private _classService: ClassScheduleService,
    private _dialog: MatDialog,
  ) {
  }

  /**
   * Opens event dialog (ClassScheduleCalendarEventComponent) on click
   * @param clickInfo - event info
   */
  handleEventClick(clickInfo: EventClickArg) {
    const dialogRef = this._dialog.open(ClassScheduleCalendarEventComponent, {
      data: clickInfo,
      autoFocus: false,
      panelClass: "g-dialog-responsive"
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
      }
    });
  }
}