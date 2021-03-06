import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Author } from "src/app/models/author";
import { Book } from "src/app/models/book";
import { AuthorsService } from "src/app/services/authors.service";
import { CollectionsService } from "src/app/services/collections.service";
import { Collection } from "src/app/models/collection";
import { map } from "rxjs/operators";
import { BookService } from "src/app/services/book.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToasterService } from "src/app/services/toaster.service";

@Component({
  selector: "bm-collection-editor",
  templateUrl: "./collection-editor.component.html",
  styleUrls: ["./collection-editor.component.scss"]
})
export class CollectionEditorComponent implements OnInit {
  collectionForm = new FormGroup({
    name: new FormControl("", Validators.maxLength(250)),
    description: new FormControl("", Validators.maxLength(500)),
    rating: new FormControl(),
    author: new FormControl(),
    series: new FormControl(),
    book: new FormControl()
  });

  authors: Author[];
  books: Book[];
  id: any;
  constructor(
    private collectionService: CollectionsService,
    private authorService: AuthorsService,
    private bookService: BookService,
    private toasterService: ToasterService,
    private route: ActivatedRoute,
    private router: Router
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

  saveCollection() {
    const collection = new Collection();
    collection.id = this.id;
    collection.name = this.collectionForm.value.name;
    collection.description = this.collectionForm.value.description;
    collection.rating = this.collectionForm.value.rating;
    collection.authors = this.collectionForm.value.authors;
    console.log("collection " + collection.name);
    this.collectionService.createCollection(collection).subscribe(
      () => {
        this.toasterService.showSuccessToaster(
          "Collection was saved successfully"
        );
        this.router.navigate(["/collections"]);
      },
      () => {
        this.toasterService.showErrorToaster("Collection saving failed");
      }
    );
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
    this.collectionService
      .getCollection(id)
      .pipe(
        map((resp: any) => {
          this.collectionForm.get("description").patchValue(resp.description);
          this.collectionForm.get("name").patchValue(resp.name);
          this.collectionForm.get("rating").patchValue(resp.rating);
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
