import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AuthorTableDataSource } from './author-table-datasource';
import {AuthorsService} from './../authors.service';

@Component({
  selector: 'bm-author-table',
  templateUrl: './author-table.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./author-table.component.css']
})
export class AuthorTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AuthorTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstName', 'lastName', 'rating', 'actions'];

  ngAfterViewInit() {
    this.dataSource = new AuthorTableDataSource(this.paginator, this.sort);
  }
}
