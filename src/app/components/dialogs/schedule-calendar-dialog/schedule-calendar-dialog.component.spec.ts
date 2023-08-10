import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleCalendarDialogComponent } from './schedule-calendar-dialog.component';

describe('ScheduleCalendarDialogComponent', () => {
  let component: ScheduleCalendarDialogComponent;
  let fixture: ComponentFixture<ScheduleCalendarDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleCalendarDialogComponent]
    });
    fixture = TestBed.createComponent(ScheduleCalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
