import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesTableComponent } from './series-table.component';

describe('SeriesTableComponent', () => {
  let component: SeriesTableComponent;
  let fixture: ComponentFixture<SeriesTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
