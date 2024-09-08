import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUsersDialogComponent } from './auth-users-dialog.component';

describe('AuthUsersDialogComponent', () => {
  let component: AuthUsersDialogComponent;
  let fixture: ComponentFixture<AuthUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthUsersDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
