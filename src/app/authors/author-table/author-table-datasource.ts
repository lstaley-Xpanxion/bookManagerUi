import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface AuthorTableItem {
  firstName: string;
  lastName: string;
  rating: number;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: AuthorTableItem[] = [
  {id: 1, firstName: 'JK', lastName: 'Rowling', rating: 10},
  { id: 2, firstName: 'Conn', lastName: 'Ignoglin', rating: 10},
  { id: 3, firstName: 'Mark', lastName: 'Lawerence', rating: 10},
  { id: 4, firstName: 'Miles', lastName: 'Cameron', rating: 10},
  { id: 5, firstName: 'Boron', lastName: 'Rowling', rating: 10},
  { id: 6, firstName: 'Patirck', lastName: 'Rothfuss', rating: 10},
  { id: 7, firstName: 'Nitrogen', lastName: 'Doe', rating: 2},
  { id: 8, firstName: 'Oxygen', lastName: 'Doe', rating: 3},
  { id: 9, firstName: 'Fluorine', lastName: 'Doe', rating: 4},
  { id: 10, firstName: 'Neon', lastName: 'Doe', rating: 6},
  { id: 11, firstName: 'Sodium', lastName: 'Doe', rating: 2},
  { id: 12, firstName: 'Magnesium', lastName: 'Doe', rating: 1},
  { id: 13, firstName: 'Aluminum', lastName: 'Doe', rating: 3.5},
  { id: 14, firstName: 'Silicon', lastName: 'Doe', rating: 5.5},
  { id: 15, firstName: 'Phosphorus', lastName: 'Doe', rating: 7.5},
  { id: 16, firstName: 'Sulfur', lastName: 'Doe', rating: 8},
  { id: 17, firstName: 'Chlorine', lastName: 'Doe', rating: 9},
  { id: 18, firstName: 'Argon', lastName: 'Doe', rating: 4},
  { id: 19, firstName: 'Potassium', lastName: 'Doe', rating: 4.5},
  { id: 20, firstName: 'Calcium', lastName: 'Doe', rating: 5},
];

/**
 * Data source for the AuthorTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AuthorTableDataSource extends DataSource<AuthorTableItem> {
  data: AuthorTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<AuthorTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: AuthorTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: AuthorTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'firstName': return compare(a.firstName, b.firstName, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/firstName columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
