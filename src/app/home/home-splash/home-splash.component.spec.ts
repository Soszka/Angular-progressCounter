import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSplashComponent } from './home-splash.component';

describe('HomeSplashComponent', () => {
  let component: HomeSplashComponent;
  let fixture: ComponentFixture<HomeSplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSplashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
