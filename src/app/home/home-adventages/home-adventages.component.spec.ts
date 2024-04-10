import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdventagesComponent } from './home-adventages.component';

describe('HomeAdventagesComponent', () => {
  let component: HomeAdventagesComponent;
  let fixture: ComponentFixture<HomeAdventagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAdventagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeAdventagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
