import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
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
    return this.http.get<Author[]>(this.apiUrl + "/authors");
  }
}
