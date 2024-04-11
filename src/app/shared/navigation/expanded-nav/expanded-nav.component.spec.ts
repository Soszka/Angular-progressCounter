import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedNavComponent } from './expanded-nav.component';

describe('ExpandedNavComponent', () => {
  let component: ExpandedNavComponent;
  let fixture: ComponentFixture<ExpandedNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandedNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpandedNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
