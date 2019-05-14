import { Component, OnInit } from "@angular/core";
import { RecentBooksTableDataSource } from "./recent-books-table-datasource";
import { BookService } from "src/app/services/book.service";

@Component({
  selector: "bm-recent-books",
  templateUrl: "./recent-books.component.html",
  styleUrls: ["./recent-books.component.scss"]
})
export class RecentBooksComponent implements OnInit {
  displayedColumns = ["title", "author", "rating", "lastUpdated", "actions"];
  dataSource: RecentBooksTableDataSource;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.dataSource = new RecentBooksTableDataSource(this.bookService);
    this.dataSource.loadBooks();
  }
}
