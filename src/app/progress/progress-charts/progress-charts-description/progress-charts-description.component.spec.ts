import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressChartsDescriptionComponent } from './progress-charts-description.component';

describe('ProgressChartsDescriptionComponent', () => {
  let component: ProgressChartsDescriptionComponent;
  let fixture: ComponentFixture<ProgressChartsDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressChartsDescriptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressChartsDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
