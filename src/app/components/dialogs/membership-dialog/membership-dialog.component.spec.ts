import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MembershipDialogComponent } from './membership-dialog.component';

describe('MembershipDialogComponent', () => {
  let component: MembershipDialogComponent;
  let fixture: ComponentFixture<MembershipDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MembershipDialogComponent],
    });
    fixture = TestBed.createComponent(MembershipDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
