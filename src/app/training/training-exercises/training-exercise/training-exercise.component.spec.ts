import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingExerciseComponent } from './training-exercise.component';

describe('TrainingExerciseComponent', () => {
  let component: TrainingExerciseComponent;
  let fixture: ComponentFixture<TrainingExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingExerciseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
