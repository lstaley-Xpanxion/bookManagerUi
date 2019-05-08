import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { merge } from "rxjs";
import { tap } from "rxjs/operators";
import { GenreTableDataSource } from "./genre-table-datasource";
import { GenreService } from "src/app/services/genre.service";

@Component({
  selector: "bm-genre-table",
  templateUrl: "./genre-table.component.html",
  styleUrls: ["./genre-table.component.scss"]
})
export class GenreTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: GenreTableDataSource;
  recordCount: number;
  defaultPageSize = 5;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["id", "name", "actions"];

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.recordCount = 10;
    this.dataSource = new GenreTableDataSource(this.genreService);
    this.dataSource.loadGenres(
      "",
      "asc",
      this.paginator.pageIndex,
      this.defaultPageSize
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadGenresPage()))
      .subscribe();
  }

  loadGenresPage() {
    this.dataSource.loadGenres(
      "",
      "asc",
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
