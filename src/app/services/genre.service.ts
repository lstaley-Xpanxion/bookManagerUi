import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Genre } from "../models/genre";

@Injectable({
  providedIn: "root"
})
export class GenreService {
  apiUrl = "http://localhost:8084/bookManager/api";

  constructor(private http: HttpClient) {}

  getGenres(
    filter: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    console.log("get Genres");
    return this.http.get(
      this.apiUrl + "/genres?pageNumber=" + pageNumber + "&pageSize=" + pageSize
    );
  }

  getGenre(id) {
    return this.http.get(this.apiUrl + "/genre/" + id);
  }

  createGenre(genre: Genre): Observable<Genre> {
    console.log("genreService - createGenre");
    return this.http.put<Genre>(this.apiUrl + "/genre", genre);
    // error catching to add
  }
}
