import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingDescriptionComponent } from './training-description.component';

describe('TrainingDescriptionComponent', () => {
  let component: TrainingDescriptionComponent;
  let fixture: ComponentFixture<TrainingDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
