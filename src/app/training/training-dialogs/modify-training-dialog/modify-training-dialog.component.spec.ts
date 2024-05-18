import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyTrainingDialogComponent } from './modify-training-dialog.component';

describe('ModifyTrainingDialogComponent', () => {
  let component: ModifyTrainingDialogComponent;
  let fixture: ComponentFixture<ModifyTrainingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifyTrainingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifyTrainingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
