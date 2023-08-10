import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassScheduleDialogComponent } from './class-schedule-dialog.component';

describe('ClassScheduleDialogComponent', () => {
  let component: ClassScheduleDialogComponent;
  let fixture: ComponentFixture<ClassScheduleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassScheduleDialogComponent]
    });
    fixture = TestBed.createComponent(ClassScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
