import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesEditorComponent } from './series-editor.component';

describe('SeriesEditorComponent', () => {
  let component: SeriesEditorComponent;
  let fixture: ComponentFixture<SeriesEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
