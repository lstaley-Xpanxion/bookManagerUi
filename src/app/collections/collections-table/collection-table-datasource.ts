import { DataSource, CollectionViewer } from "@angular/cdk/collections";
import { map, finalize } from "rxjs/operators";
import { Observable, BehaviorSubject } from "rxjs";
import { Collection } from "src/app/models/collection";
import { CollectionsService } from "src/app/services/collections.service";

/**
 * Data source for the CollectionTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class CollectionTableDataSource extends DataSource<Collection> {
  private collectionsSubject = new BehaviorSubject<Collection[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  collections: Collection[];

  public loading = this.loadingSubject.asObservable();

  constructor(private collectionService: CollectionsService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Collection[]> {
    return this.collectionsSubject.asObservable();
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.collectionsSubject.complete();
    this.loadingSubject.complete();
  }

  loadCollections(
    filter: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    this.loadingSubject.next(true);

    this.collectionService
      .getCollections(filter, sortOrder, pageNumber, pageSize)
      .pipe(
        map((resp: any) => {
          console.log("resp collection" + resp);
          console.log("embedded collection" + resp._embedded);
          this.collections = resp._embedded.collections;
        })
      )
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe(() => this.collectionsSubject.next(this.collections));

    console.log("collections " + this.collections);
  }
}
