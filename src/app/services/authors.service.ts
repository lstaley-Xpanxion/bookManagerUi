import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Author } from "../models/author";

@Injectable({
  providedIn: "root"
})
export class AuthorsService {
  apiUrl = "http://localhost:8084/bookManager/api";
  constructor(private http: HttpClient) {}

  /**
   * Returns the given Page of Authors based on the given parameters.
   * @param filter, filters the results with the given value
   * @param sortOrder, provides the sort order, ASC or DESC
   * @param pageNumber, the number of the page to return
   * @param pageSize, the record counts for a given page.
   */
  getAuthors(
    filter: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    return this.http.get(
      this.apiUrl +
        "/authors?pageNumber=" +
        pageNumber +
        "&pageSize=" +
        pageSize
    );
  }

  getAllAuthors() {
    return this.http.get(this.apiUrl + "/authors");
  }

  getAuthor(id: string) {
    return this.http.get<Author>(this.apiUrl + "/author/" + id);
  }

  /**
   * Creates/updates an Authors
   */
  createAuthor(author: Author): Observable<Author> {
    return this.http.put<Author>(this.apiUrl + "/author", author);
    // error catching to add
  }

  /**
   * returns the most recently updated Authors
   */
  getRecentlyUpdatedAuthors(
    sortField: string,
    sortOrder: string,
    pageSize: number
  ) {
    return this.http.get<Author[]>(
      this.apiUrl +
        "/authors?sortOrder=" +
        sortOrder +
        "&pageSize=" +
        pageSize +
        "&sortField=" +
        sortField
    );
  }
}
