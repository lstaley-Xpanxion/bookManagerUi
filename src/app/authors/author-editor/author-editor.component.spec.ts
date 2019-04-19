import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorEditorComponent } from './author-editor.component';

describe('AuthorEditorComponent', () => {
  let component: AuthorEditorComponent;
  let fixture: ComponentFixture<AuthorEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
