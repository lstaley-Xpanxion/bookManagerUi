import { Injectable } from "@angular/core";
import { Book } from "../models/book";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BookService {
  apiUrl = "http://localhost:8084/bookManager/api";
  constructor(private http: HttpClient) {}

  getBooks(
    filter: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    return this.http.get(
      this.apiUrl + "/books?pageNumber=" + pageNumber + "&pageSize=" + pageSize
    );
  }

  createAuthor(book: Book): Observable<Book> {
    console.log("bookService - createAuthor");
    return this.http.put<Book>(this.apiUrl + "/book", book);
    // error catching to add
  }
}
