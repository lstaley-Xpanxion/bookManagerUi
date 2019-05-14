import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentAuthorsComponent } from './recent-authors.component';

describe('RecentAuthorsComponent', () => {
  let component: RecentAuthorsComponent;
  let fixture: ComponentFixture<RecentAuthorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentAuthorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
