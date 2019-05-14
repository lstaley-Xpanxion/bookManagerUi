import { Component, OnInit } from "@angular/core";
import { RecentBooksTableDataSource } from "../recent-books/recent-books-table-datasource";
import { BookService } from "src/app/services/book.service";

@Component({
  selector: "bm-top-books",
  templateUrl: "./top-books.component.html",
  styleUrls: ["./top-books.component.scss"]
})
export class TopBooksComponent implements OnInit {
  displayedColumns = ["title", "author", "rating", "lastUpdated", "actions"];
  dataSource: RecentBooksTableDataSource;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.dataSource = new RecentBooksTableDataSource(this.bookService);
    this.dataSource.loadTopRatedBooks();
  }
}
