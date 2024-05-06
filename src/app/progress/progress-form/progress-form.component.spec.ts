import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressFormComponent } from './progress-form.component';

describe('ProgressFormComponent', () => {
  let component: ProgressFormComponent;
  let fixture: ComponentFixture<ProgressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
