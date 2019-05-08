import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { map, finalize } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { Collection } from "src/app/models/collection";
import { CollectionsService } from "src/app/services/collections.service";
import { Genre } from "src/app/models/genre";
import { GenreService } from "src/app/services/genre.service";

/**
 * Data source for the GenreTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class GenreTableDataSource extends DataSource<Genre> {
  private genresSubject = new BehaviorSubject<Genre[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  genres: Genre[];

  public loading = this.loadingSubject.asObservable();

  constructor(private genreService: GenreService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Genre[]> {
    return this.genresSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.genresSubject.complete();
    this.loadingSubject.complete();
  }

  loadGenres(
    filter: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);

    this.genreService
      .getGenres(filter, sortOrder, pageNumber, pageSize)
      .pipe(
        map((resp: any) => {
          console.log("resp genre" + resp);
          console.log("embedded genre" + resp._embedded);
          this.genres = resp._embedded.genres;
        })
      )
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(() => this.genresSubject.next(this.genres));

    console.log("genres " + this.genres);
  }
}
