import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { Author } from "./../models/author";

@Injectable({
  providedIn: "root"
})
export class AuthorsService {
  apiUrl = "http://localhost:8084/bookManager/api";
  constructor(private http: HttpClient) {}

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

  createAuthor(author: Author): Observable<Author> {
    console.log("authorService createAuthor");
    return this.http.put<Author>(this.apiUrl + "/author", author);
    // error catching to add
  }
}
