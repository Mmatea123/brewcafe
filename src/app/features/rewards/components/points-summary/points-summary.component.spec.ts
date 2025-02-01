import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsSummaryComponent } from './points-summary.component';

describe('PointsSummaryComponent', () => {
  let component: PointsSummaryComponent;
  let fixture: ComponentFixture<PointsSummaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PointsSummaryComponent]
    });
    fixture = TestBed.createComponent(PointsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
