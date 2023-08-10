import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionScheduleComponent } from './nutrition-schedule.component';

describe('NutritionScheduleComponent', () => {
  let component: NutritionScheduleComponent;
  let fixture: ComponentFixture<NutritionScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionScheduleComponent]
    });
    fixture = TestBed.createComponent(NutritionScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
