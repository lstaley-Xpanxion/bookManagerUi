import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation,
  OnInit
} from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { BookTableDataSource } from "./book-table-datasource";
import { tap } from "rxjs/operators";
import { merge } from "rxjs";
import { BookService } from "src/app/services/book.service";

@Component({
  selector: "bm-book-table",
  templateUrl: "./book-table.component.html",
  encapsulation: ViewEncapsulation.None,
  styleUrls: ["./book-table.component.css"]
})
export class BookTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: BookTableDataSource;
  recordCount: number;
  defaultPageSize = 5;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["id", "title", "rating", "author", "actions"];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.recordCount = 10;
    this.dataSource = new BookTableDataSource(this.bookService);
    this.dataSource.loadBooks(
      "",
      "asc",
      this.paginator.pageIndex,
      this.defaultPageSize
    );
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(tap(() => this.loadBooksPage()))
      .subscribe();

    //  this.paginator.page.pipe(tap(() => this.loadAuthorsPage())).subscribe();
    // console.log(this.paginator.pageSize + " size2");
  }

  loadBooksPage() {
    this.dataSource.loadBooks(
      "",
      "asc",
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
  }
}
