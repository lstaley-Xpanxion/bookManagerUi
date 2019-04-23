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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["id", "firstName", "lastName", "rating", "actions"];

  constructor(private authorsService: AuthorsService) {}

  ngOnInit(): void {
    console.log("test");
    this.dataSource = new AuthorsTableDataSource(this.authorsService);
    this.dataSource.loadAuthors("", "asc", 1, 50);
  }

  ngAfterViewInit() {
    console.log("test2");
    // this.dataSource = new AuthorsTableDataSource(this.authorsService);
    // this.dataSource.loadAuthors("", "asc", 1, 50);
  }
}
