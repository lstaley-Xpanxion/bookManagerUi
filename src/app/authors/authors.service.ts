import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
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
  ): Observable<Author[]> {
    console.log("getAuthors");
    let res = this.http.get<Author[]>(
      this.apiUrl +
        "/authors?pageNumber=" +
        pageNumber +
        "&pageSize=" +
        pageSize
    );
    console.log(res);
    return res;
  }
  getAuthors2(
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
    /*const options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };  --going to handle in interceptor */

    console.log("authorService ceateAuthor");
    return this.http.put<Author>(this.apiUrl + "/author", author);
    // error catching to add
  }
}
