import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveExercisePostionDialogComponent } from './remove-exercise-postion-dialog.component';

describe('RemoveExercisePostionDialogComponent', () => {
  let component: RemoveExercisePostionDialogComponent;
  let fixture: ComponentFixture<RemoveExercisePostionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveExercisePostionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemoveExercisePostionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
