import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { Breakpoints, BreakpointObserver } from "@angular/cdk/layout";

@Component({
  selector: "bm-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: "Recently Reviewed Authors", cols: 1, rows: 1 },
          { title: "Recently Reviewed Books", cols: 1, rows: 1 },
          { title: "Recently Reviewed Series", cols: 1, rows: 1 },
          { title: "Top Rated Books", cols: 1, rows: 1 }
        ];
      }

      return [
        { title: "Recently Reviewed Authors", cols: 2, rows: 2 },
        { title: "Recently Reviewed Books", cols: 2, rows: 2 },
        { title: "Recently Reviewed Series", cols: 1, rows: 2 },
        { title: "Top Rated Books", cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {}
}
