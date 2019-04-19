import { Component, OnInit } from '@angular/core';
import {MatFormField} from '@angular/material';
import {Book} from '../../models/book';

@Component({
  selector: 'bm-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss']
})
export class BookEditorComponent implements OnInit {

  book: Book = {
    id : 1,
    title : '',
    description : '',
    rating : 10,
    author : null,
  };

  authors = ['Unknown', 'JK Rowling', 'Patrick Rothfuss', 'Mark Lawrence'];

  constructor() { }

  ngOnInit() {
  }

}
