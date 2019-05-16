import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { Author } from "./../../models/author";
import { AuthorsService } from "../../services/authors.service";
import { BehaviorSubject, of } from "rxjs";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";

export class AuthorsTableDataSource implements DataSource<Author> {
  private authorsSubject = new BehaviorSubject<Author[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  authors: Author[];
  authorsCount: number;

  public loading = this.loadingSubject.asObservable();

  constructor(private authorService: AuthorsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Author[]> {
    return this.authorsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.authorsSubject.complete();
    this.loadingSubject.complete();
  }

  loadAuthors(
    filter: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);

    this.authorService
      .getAuthors(filter, sortOrder, pageNumber, pageSize)
      .pipe(
        map((resp: any) => {
          this.authors = resp._embedded.authors;
        })
      )
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(() => this.authorsSubject.next(this.authors));
  }

  getAuthorCount() {
    this.authorService
      .getAuthorsCount()
      .pipe(
        map((resp: any) => {
          this.authorsCount = resp;
        })
      )
      .subscribe();
  }
}
