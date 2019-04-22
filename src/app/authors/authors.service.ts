import { Injectable } from '@angular/core';
import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";
import { MatPaginator, MatSort } from "@angular/material";
import { AuthorTableDataSource } from "./author-table/author-table-datasource";

@Injectable({
  providedIn: "root"
})
export class AuthorsService {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AuthorTableDataSource;

  constructor() {}

  ngAfterViewInit() {
    this.dataSource = new AuthorTableDataSource(this.paginator, this.sort);
  }

  getAuthors() {
    return;
  }
}
