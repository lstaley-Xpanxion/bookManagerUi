import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Author } from "src/app/models/author";
import { Book } from "src/app/models/book";
import { Series } from "src/app/models/series";
import { AuthorsService } from "src/app/services/authors.service";
import { CollectionsService } from "src/app/services/collections.service";
import { Collection } from "src/app/models/collection";
import { map } from "rxjs/operators";
import { BookService } from "src/app/services/book.service";

@Component({
  selector: "bm-collection-editor",
  templateUrl: "./collection-editor.component.html",
  styleUrls: ["./collection-editor.component.scss"]
})
export class CollectionEditorComponent implements OnInit {
  collectionForm = new FormGroup({
    name: new FormControl(""),
    description: new FormControl(""),
    rating: new FormControl(),
    author: new FormControl(),
    series: new FormControl(Series),
    book: new FormControl()
  });

  authors: Author[];
  books: Book[];

  constructor(
    private collectionService: CollectionsService,
    private authorService: AuthorsService,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.loadAuthors();
    this.loadBooks();
  }

  saveCollection() {
    const collection = new Collection();
    collection.name = this.collectionForm.value.name;
    collection.description = this.collectionForm.value.description;
    collection.rating = this.collectionForm.value.rating;
    collection.authors = this.collectionForm.value.authors;
    console.log("collection " + collection.name);
    this.collectionService
      .createCollection(collection)
      .subscribe(response => {});
  }

  /**
   * Loads the list of all Authors
   */
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

  loadBooks() {
    console.log("load Books");
    return this.bookService
      .getAllBooks()
      .pipe(
        map((resp: any) => {
          this.books = resp._embedded.books;
        })
      )
      .subscribe();
  }

  compareAuthors(a1: Author, a2: Author): boolean {
    return a1 && a2 ? a1.id === a2.id : a1 === a2;
  }

  compareBooks(b1: Book, b2: Book): boolean {
    return b1 && b2 ? b1.id === b2.id : b1 === b2;
  }
}
