import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Series } from "../models/series";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SeriesService {
  apiUrl = "http://localhost:8084/bookManager/api";

  constructor(private http: HttpClient) {}

  getSeries(
    filter: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    console.log("get Series");
    return this.http.get(
      this.apiUrl + "/series?pageNumber=" + pageNumber + "&pageSize=" + pageSize
    );
  }

  getASeries(id) {
    return this.http.get(this.apiUrl + "/series/" + id);
  }

  createSeries(series: Series): Observable<Series> {
    console.log("seriesService createSeries");
    return this.http.put<Series>(this.apiUrl + "/series", series);
    // error catching to add
  }

  getRecentlyUpdatedSeries(
    sortField: string,
    sortOrder: string,
    pageSize: number
  ) {
    return this.http.get<Series[]>(
      this.apiUrl +
        "/series?sortOrder=" +
        sortOrder +
        "&pageSize=" +
        pageSize +
        "&sortField=" +
        sortField
    );
  }
}
