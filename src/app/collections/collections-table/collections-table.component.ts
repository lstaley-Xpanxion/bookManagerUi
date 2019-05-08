import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatSort, MatPaginator } from "@angular/material";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import { CollectionTableDataSource } from "./collection-table-datasource";
import { CollectionsService } from "src/app/services/collections.service";

@Component({
  selector: "bm-collections-table",
  templateUrl: "./collections-table.component.html",
  styleUrls: ["./collections-table.component.scss"]
})
export class CollectionsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CollectionTableDataSource;
  recordCount: number;
  defaultPageSize = 5;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["id", "name", "description", "actions"];

  constructor(private collectionService: CollectionsService) {}

  ngOnInit(): void {
    this.recordCount = 10;
    this.dataSource = new CollectionTableDataSource(this.collectionService);
    this.dataSource.loadCollections(
      "",
      "asc",
      this.paginator.pageIndex,
      this.defaultPageSize
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadCollectionsPage()))
      .subscribe();
  }

  loadCollectionsPage() {
    this.dataSource.loadCollections(
      "",
      "asc",
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
