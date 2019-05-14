import { Component, OnInit } from "@angular/core";
import { RecentSeriesTableDataSource } from "./recent-series-table-datasource";
import { SeriesService } from "src/app/services/series.service";

@Component({
  selector: "bm-recent-series",
  templateUrl: "./recent-series.component.html",
  styleUrls: ["./recent-series.component.scss"]
})
export class RecentSeriesComponent implements OnInit {
  displayedColumns = ["name", "rating", "lastUpdated", "actions"];
  dataSource: RecentSeriesTableDataSource;

  constructor(private seriesService: SeriesService) {}

  ngOnInit() {
    this.dataSource = new RecentSeriesTableDataSource(this.seriesService);
    this.dataSource.loadSeries();
  }
}
