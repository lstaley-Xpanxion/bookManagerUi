import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Collection } from "../models/collection";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CollectionsService {
  apiUrl = "http://localhost:8084/bookManager/api";

  constructor(private http: HttpClient) {}

  getCollections(
    filter: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ) {
    console.log("get Collections");
    return this.http.get(
      this.apiUrl +
        "/collections?pageNumber=" +
        pageNumber +
        "&pageSize=" +
        pageSize
    );
  }

  createCollection(collection: Collection): Observable<Collection> {
    console.log("collectionService createCollection");
    return this.http.put<Collection>(this.apiUrl + "/collection", collection);
    // error catching to add
  }
}
