import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentSeriesComponent } from './recent-series.component';

describe('RecentSeriesComponent', () => {
  let component: RecentSeriesComponent;
  let fixture: ComponentFixture<RecentSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
