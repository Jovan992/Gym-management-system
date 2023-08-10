import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountantDialogComponent } from './accountant-dialog.component';

describe('AccountantDialogComponent', () => {
  let component: AccountantDialogComponent;
  let fixture: ComponentFixture<AccountantDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountantDialogComponent]
    });
    fixture = TestBed.createComponent(AccountantDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
