import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListComponent } from './rewards-list.component';

describe('RewardsListComponent', () => {
  let component: RewardsListComponent;
  let fixture: ComponentFixture<RewardsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsListComponent]
    });
    fixture = TestBed.createComponent(RewardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
