import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { Author } from "../../models/author";
import { AuthorsService } from "../../services/authors.service";
import { BehaviorSubject, of } from "rxjs";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/book";

export class RecentBooksTableDataSource implements DataSource<Book> {
  private booksSubject = new BehaviorSubject<Book[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  books: Book[];

  public loading = this.loadingSubject.asObservable();

  constructor(private bookService: BookService) {}

  connect(collectionViewer: CollectionViewer): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.booksSubject.complete();
    this.loadingSubject.complete();
  }

  loadBooks() {
    this.loadingSubject.next(true);

    this.bookService
      .getRecentlyUpdatedBooks("updated_by", "ASC", 10)
      .pipe(
        map((resp: any) => {
          this.books = resp._embedded.books;
        })
      )
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(() => this.booksSubject.next(this.books));
  }

  loadTopRatedBooks() {
    this.loadingSubject.next(true);

    this.bookService
      .getTopRatedBooks(10)
      .pipe(
        map((resp: any) => {
          this.books = resp._embedded.books;
        })
      )
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(() => this.booksSubject.next(this.books));
  }
}
