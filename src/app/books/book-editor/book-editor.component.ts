import { Component, OnInit } from '@angular/core';
import {MatFormField} from '@angular/material';
@Component({
  selector: 'bm-book-editor',
  templateUrl: './book-editor.component.html',
  styleUrls: ['./book-editor.component.scss']
})
export class BookEditorComponent implements OnInit {

  title: string;
  description: string;
  rating: number;
  selected = 'Unknown';

  constructor() { }

  ngOnInit() {
  }

}
