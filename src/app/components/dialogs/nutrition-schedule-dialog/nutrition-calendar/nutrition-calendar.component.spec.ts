import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionCalendarComponent } from './nutrition-calendar.component';

describe('NutritionCalendarComponent', () => {
  let component: NutritionCalendarComponent;
  let fixture: ComponentFixture<NutritionCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NutritionCalendarComponent]
    });
    fixture = TestBed.createComponent(NutritionCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
