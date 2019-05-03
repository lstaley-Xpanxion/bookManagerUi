import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation,
  OnInit
} from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { AuthorsTableDataSource } from "./authors-table-datasource";
import { AuthorsService } from "./../authors.service";
import { tap } from "rxjs/operators";
import { merge } from "rxjs/internal/observable/merge";

@Component({
  selector: "bm-author-table",
  templateUrl: "./author-table.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./author-table.component.css"]
})
export class AuthorTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AuthorsTableDataSource;

  recordCount: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["id", "firstName", "lastName", "rating", "actions"];
  defaultPageSize = 5;

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    this.recordCount = 10;
    this.dataSource = new AuthorsTableDataSource(this.authorsService);
    this.dataSource.loadAuthors(
      "",
      "asc",
      this.paginator.pageIndex,
      this.defaultPageSize
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadAuthorsPage()))
      .subscribe();

    //  this.paginator.page.pipe(tap(() => this.loadAuthorsPage())).subscribe();
    // console.log(this.paginator.pageSize + " size2");
  }

  loadAuthorsPage() {
    this.dataSource.loadAuthors(
      "",
      "asc",
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
