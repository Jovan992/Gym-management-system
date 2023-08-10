import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassScheduleCalendarEventComponent } from './class-schedule-calendar-event.component';

describe('ClassScheduleCalendarEventComponent', () => {
  let component: ClassScheduleCalendarEventComponent;
  let fixture: ComponentFixture<ClassScheduleCalendarEventComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassScheduleCalendarEventComponent]
    });
    fixture = TestBed.createComponent(ClassScheduleCalendarEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
