import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceCoverageComponent } from './view-service-coverage.component';

describe('ViewServiceCoverageComponent', () => {
  let component: ViewServiceCoverageComponent;
  let fixture: ComponentFixture<ViewServiceCoverageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewServiceCoverageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewServiceCoverageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
