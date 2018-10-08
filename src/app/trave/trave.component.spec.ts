import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraveComponent } from './trave.component';

describe('TraveComponent', () => {
  let component: TraveComponent;
  let fixture: ComponentFixture<TraveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
