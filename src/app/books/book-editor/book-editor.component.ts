import { Component, OnInit } from "@angular/core";
import { Book } from "../../models/book";
import { FormGroup, FormControl } from "@angular/forms";
import { BookService } from "src/app/services/book.service";

@Component({
  selector: "bm-book-editor",
  templateUrl: "./book-editor.component.html",
  styleUrls: ["./book-editor.component.scss"]
})
export class BookEditorComponent implements OnInit {
  bookForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl(""),
    rating: new FormControl(),
    author: new FormControl(),
    series: new FormControl(),
    collection: new FormControl()
  });

  authors = ["J.K Rowling", "Patrick Rothfuss", "Dan Brown"];

  constructor(private bookService: BookService) {}

  ngOnInit() {}

  saveBook() {
    const book = new Book();
    book.title = this.bookForm.value.title;
    book.description = this.bookForm.value.description;
    book.rating = this.bookForm.value.rating;
    book.author = this.bookForm.value.author;
    this.bookService.createAuthor(book).subscribe(response => {});
  }
}
