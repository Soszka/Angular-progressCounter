import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExercisePositionDialogComponent } from './add-exercise-position-dialog.component';

describe('AddExercisePositionDialogComponent', () => {
  let component: AddExercisePositionDialogComponent;
  let fixture: ComponentFixture<AddExercisePositionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddExercisePositionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddExercisePositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
