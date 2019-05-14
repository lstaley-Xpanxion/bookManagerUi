import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs";
import { finalize, map } from "rxjs/operators";
import { Series } from "src/app/models/series";
import { SeriesService } from "src/app/services/series.service";

export class RecentSeriesTableDataSource implements DataSource<Series> {
  private seriesSubject = new BehaviorSubject<Series[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  series: Series[];

  public loading = this.loadingSubject.asObservable();

  constructor(private serviceService: SeriesService) {}

  connect(collectionViewer: CollectionViewer): Observable<Series[]> {
    return this.seriesSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.seriesSubject.complete();
    this.loadingSubject.complete();
  }

  loadSeries() {
    this.loadingSubject.next(true);

    this.serviceService
      .getRecentlyUpdatedSeries("updated_by", "ASC", 10)
      .pipe(
        map((resp: any) => {
          this.series = resp._embedded.series;
        })
      )
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(() => this.seriesSubject.next(this.series));
  }
}
