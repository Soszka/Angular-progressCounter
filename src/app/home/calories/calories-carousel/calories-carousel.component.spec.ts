import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaloriesCarouselComponent } from './calories-carousel.component';

describe('CaloriesCarouselComponent', () => {
  let component: CaloriesCarouselComponent;
  let fixture: ComponentFixture<CaloriesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaloriesCarouselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaloriesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
