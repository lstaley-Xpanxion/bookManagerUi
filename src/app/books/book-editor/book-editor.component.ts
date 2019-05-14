import { Component, OnInit } from "@angular/core";
import { Book } from "../../models/book";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BookService } from "src/app/services/book.service";
import { AuthorsService } from "src/app/services/authors.service";
import { Author } from "src/app/models/author";
import { Observable } from "rxjs";
import { tap, map } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "bm-book-editor",
  templateUrl: "./book-editor.component.html",
  styleUrls: ["./book-editor.component.scss"]
})
export class BookEditorComponent implements OnInit {
  bookForm = new FormGroup({
    title: new FormControl("", Validators.maxLength(250)),
    description: new FormControl("", Validators.maxLength(500)),
    rating: new FormControl(),
    author: new FormControl(),
    series: new FormControl(),
    collection: new FormControl()
  });

  authors: Author[];
  id: any;
  constructor(
    private bookService: BookService,
    private authorService: AuthorsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadAuthors();
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id != null) {
      this.populateForm(this.id);
    }
    console.log(this.id);
  }

  saveBook() {
    const book = new Book();
    book.id = this.id;
    book.title = this.bookForm.value.title;
    book.description = this.bookForm.value.description;
    book.rating = this.bookForm.value.rating;
    book.author = this.bookForm.value.author;
    this.bookService.createAuthor(book).subscribe(response => {});
  }

  loadAuthors() {
    return this.authorService
      .getAllAuthors()
      .pipe(
        map((resp: any) => {
          this.authors = resp._embedded.authors;
        })
      )
      .subscribe();
  }

  compareAuthors(a1: Author, a2: Author): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }

  private populateForm(id) {
    this.bookService
      .getBook(id)
      .pipe(
        map((resp: any) => {
          this.bookForm.get("title").patchValue(resp.title);
          this.bookForm.get("description").patchValue(resp.description);
          this.bookForm.get("rating").patchValue(resp.rating);
        })
      )
      .subscribe();
  }
}
