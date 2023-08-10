import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterDialogComponent } from './newsletter-dialog.component';

describe('NewsletterDialogComponent', () => {
  let component: NewsletterDialogComponent;
  let fixture: ComponentFixture<NewsletterDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsletterDialogComponent]
    });
    fixture = TestBed.createComponent(NewsletterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
