import { Component, OnInit } from "@angular/core";
import { AuthorsService } from "src/app/services/authors.service";
import { RecentAuthorsTableDataSource } from "./recent-authors-table-datasource";

@Component({
  selector: "bm-recent-authors",
  templateUrl: "./recent-authors.component.html",
  styleUrls: ["./recent-authors.component.scss"]
})
export class RecentAuthorsComponent implements OnInit {
  dataSource: RecentAuthorsTableDataSource;

  displayedColumns = [
    "firstName",
    "lastName",
    "rating",
    "lastUpdated",
    "actions"
  ];

  constructor(private authorService: AuthorsService) {}

  ngOnInit() {
    this.dataSource = new RecentAuthorsTableDataSource(this.authorService);
    this.dataSource.loadAuthors();
  }
}
