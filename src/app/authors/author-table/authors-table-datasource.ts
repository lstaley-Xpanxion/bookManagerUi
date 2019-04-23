import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { Author } from "./../../models/author";
import { AuthorsService } from "../authors.service";
import { BehaviorSubject, of } from "rxjs";
import { Observable } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

export class AuthorsTableDataSource implements DataSource<Author> {
  private authorsSubject = new BehaviorSubject<Author[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private authorService: AuthorsService) {}

  connect(collectionViewer: CollectionViewer): Observable<Author[]> {
    console.log("connect");
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
    console.log("loadAuthors");
    this.loadingSubject.next(true);
    this.authorService.findAuthors();
    this.authorService
      .getAuthors(filter, sortOrder, pageNumber, pageSize)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(authors => this.authorsSubject.next(authors));
  }
}
