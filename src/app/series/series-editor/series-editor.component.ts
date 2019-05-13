import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Series } from "src/app/models/series";
import { Author } from "src/app/models/author";
import { Book } from "src/app/models/book";
import { CollectionsService } from "src/app/services/collections.service";
import { AuthorsService } from "src/app/services/authors.service";
import { BookService } from "src/app/services/book.service";
import { Collection } from "src/app/models/collection";
import { map } from "rxjs/operators";
import { SeriesService } from "src/app/services/series.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "bm-series-editor",
  templateUrl: "./series-editor.component.html",
  styleUrls: ["./series-editor.component.scss"]
})
export class SeriesEditorComponent implements OnInit {
  seriesForm = new FormGroup({
    name: new FormControl(),
    description: new FormControl(),
    rating: new FormControl(),
    author: new FormControl(),
    book: new FormControl(),
    collection: new FormControl()
  });

  authors: Author[];
  books: Book[];
  collection: Collection;
  id: any;

  constructor(
    private seriesSerivce: SeriesService,
    private authorService: AuthorsService,
    private bookService: BookService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadAuthors();
    this.loadBooks();
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id != null) {
      this.populateForm(this.id);
    }
    console.log("id " + this.id);
  }

  saveSeries() {
    const series = new Series();
    series.id = this.id;
    series.name = this.seriesForm.value.name;
    series.description = this.seriesForm.value.description;
    series.rating = this.seriesForm.value.rating;
    series.author = this.seriesForm.value.author;
    console.log("series " + series.name);
    this.seriesSerivce.createSeries(series).subscribe(response => {});
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

  private populateForm(id) {
    this.seriesSerivce
      .getASeries(id)
      .pipe(
        map((resp: any) => {
          this.seriesForm.get("description").patchValue(resp.description);
          this.seriesForm.get("name").patchValue(resp.name);
          this.seriesForm.get("rating").patchValue(resp.rating);
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
