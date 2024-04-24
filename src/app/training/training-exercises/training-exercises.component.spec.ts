import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingExercisesComponent } from './training-exercises.component';

describe('TrainingExercisesComponent', () => {
  let component: TrainingExercisesComponent;
  let fixture: ComponentFixture<TrainingExercisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingExercisesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
