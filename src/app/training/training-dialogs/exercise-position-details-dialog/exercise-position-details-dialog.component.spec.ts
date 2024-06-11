import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisePositionDetailsDialogComponent } from './exercise-position-details-dialog.component';

describe('ExercisePositionDetailsDialogComponent', () => {
  let component: ExercisePositionDetailsDialogComponent;
  let fixture: ComponentFixture<ExercisePositionDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisePositionDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExercisePositionDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
