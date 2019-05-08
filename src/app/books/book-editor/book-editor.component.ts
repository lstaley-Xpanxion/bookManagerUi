import { Component, OnInit } from "@angular/core";
import { Book } from "../../models/book";
import { FormGroup, FormControl } from "@angular/forms";
import { BookService } from "src/app/services/book.service";
import { AuthorsService } from "src/app/services/authors.service";
import { Author } from "src/app/models/author";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";

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
    author: new FormControl(Author),
    series: new FormControl(),
    collection: new FormControl()
  });

  authors: Author[];
  // ["J.K Rowling", "Patrick Rothfuss", "Dan Brown"];

  constructor(
    private bookService: BookService,
    private authorService: AuthorsService
  ) {}

  ngOnInit() {
    this.loadAuthors();
  }

  saveBook() {
    const book = new Book();
    book.title = this.bookForm.value.title;
    book.description = this.bookForm.value.description;
    book.rating = this.bookForm.value.rating;
    book.author = this.bookForm.value.author;
    this.bookService.createAuthor(book).subscribe(response => {});
  }

  loadAuthors() {
    console.log("load Authors");
    return this.authorService
      .getAllAuthors()
      .pipe(
        map((resp: any) => {
          this.authors = resp._embedded.authors;
          console.log(this.authors);
        })
      )
      .subscribe();
  }

  compareAuthors(a1: Author, a2: Author): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }
}
