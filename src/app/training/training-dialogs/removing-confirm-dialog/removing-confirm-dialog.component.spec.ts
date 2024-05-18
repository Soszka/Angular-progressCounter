import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovingConfirmDialogComponent } from './removing-confirm-dialog.component';

describe('RemovingConfirmDialogComponent', () => {
  let component: RemovingConfirmDialogComponent;
  let fixture: ComponentFixture<RemovingConfirmDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemovingConfirmDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemovingConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
