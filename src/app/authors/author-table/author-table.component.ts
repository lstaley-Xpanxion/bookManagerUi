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
    console.log("test");
    this.recordCount = 10;
    this.dataSource = new AuthorsTableDataSource(this.authorsService);
    console.log(this.paginator.pageSize + " size");
    this.dataSource.loadAuthors(
      "",
      "asc",
      this.paginator.pageIndex,
      this.defaultPageSize
    );
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadAuthorsPage())).subscribe();
    console.log(this.paginator.pageSize + " size2");
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
