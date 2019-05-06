import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { MatPaginator, MatSort } from "@angular/material";
import { map, finalize } from "rxjs/operators";
import { Observable, of as observableOf, merge, BehaviorSubject } from "rxjs";
import { Book } from "src/app/models/book";
import { BookService } from "src/app/services/book.service";

/**
 * Data source for the BookTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BookTableDataSource extends DataSource<Book> {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  books: Book[];

  public loading = this.loadingSubject.asObservable();

  constructor(private bookService: BookService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.booksSubject.complete();
    this.loadingSubject.complete();
  }

  loadBooks(
    filter: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);

    this.bookService
      .getBooks(filter, sortOrder, pageNumber, pageSize)
      .pipe(
        map((resp: any) => {
          console.log("resp " + resp);
          console.log("embedded " + resp._embedded);
          this.books = resp._embedded.books;
        })
      )
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(() => this.booksSubject.next(this.books));

    console.log("books " + this.books);
  }
}
