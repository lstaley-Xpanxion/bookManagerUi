import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BookTableDataSource } from './book-table-datasource';

@Component({
  selector: 'bm-book-table',
  templateUrl: './book-table.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: BookTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title', 'rating', 'author'];

  ngAfterViewInit() {
    this.dataSource = new BookTableDataSource(this.paginator, this.sort);
  }
}
