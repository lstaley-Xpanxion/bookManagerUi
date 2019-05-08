import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreEditorComponent } from './genre-editor.component';

describe('GenreEditorComponent', () => {
  let component: GenreEditorComponent;
  let fixture: ComponentFixture<GenreEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
