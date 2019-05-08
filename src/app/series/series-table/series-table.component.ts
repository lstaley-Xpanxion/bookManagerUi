import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import { SeriesService } from "src/app/services/series.service";
import { SeriesTableDataSource } from "./series-table-datasource";

@Component({
  selector: "bm-series-table",
  templateUrl: "./series-table.component.html",
  styleUrls: ["./series-table.component.scss"]
})
export class SeriesTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: SeriesTableDataSource;
  recordCount: number;
  defaultPageSize = 5;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["name", "rating", "author", "books", "actions"];

  constructor(private seriesService: SeriesService) {}

  ngOnInit(): void {
    this.recordCount = 10;
    this.dataSource = new SeriesTableDataSource(this.seriesService);
    this.dataSource.loadSeries(
      "",
      "asc",
      this.paginator.pageIndex,
      this.defaultPageSize
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadSeriesPage()))
      .subscribe();
  }

  loadSeriesPage() {
    this.dataSource.loadSeries(
      "",
      "asc",
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
