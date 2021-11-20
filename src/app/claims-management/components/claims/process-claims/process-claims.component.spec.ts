import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessClaimsComponent } from './process-claims.component';

describe('ProcessClaimsComponent', () => {
  let component: ProcessClaimsComponent;
  let fixture: ComponentFixture<ProcessClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessClaimsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
