import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { map, finalize } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { Series } from "src/app/models/series";
import { SeriesService } from "src/app/services/series.service";

/**
 * Data source for the SeriesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SeriesTableDataSource extends DataSource<Series> {
  private seriesSubject = new BehaviorSubject<Series[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  series: Series[];

  public loading = this.loadingSubject.asObservable();

  constructor(private seriesService: SeriesService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Series[]> {
    return this.seriesSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.seriesSubject.complete();
    this.loadingSubject.complete();
  }

  loadSeries(
    filter: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);

    this.seriesService
      .getSeries(filter, sortOrder, pageNumber, pageSize)
      .pipe(
        map((resp: any) => {
          console.log("resp series" + resp);
          console.log("embedded series" + resp._embedded);
          this.series = resp._embedded.series;
        })
      )
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(() => this.seriesSubject.next(this.series));

    console.log("series " + this.series);
  }
}
