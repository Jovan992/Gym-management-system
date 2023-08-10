import { TestBed } from '@angular/core/testing';

import { NutritionScheduleService } from './nutrition-schedule.service';

describe('NutritionScheduleService', () => {
  let service: NutritionScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NutritionScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
