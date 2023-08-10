import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionScheduleDialogComponent } from './nutrition-schedule-dialog.component';

describe('NutritionScheduleDialogComponent', () => {
  let component: NutritionScheduleDialogComponent;
  let fixture: ComponentFixture<NutritionScheduleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionScheduleDialogComponent]
    });
    fixture = TestBed.createComponent(NutritionScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
