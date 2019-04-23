import { DataSource } from "@angular/cdk/collections";
import { MatPaginator, MatSort } from "@angular/material";
import { map } from "rxjs/operators";
import { Observable, of as observableOf, merge } from "rxjs";

// TODO: Replace this with your own data model type
export interface BookTableItem {
  author: string;
  rating: number;
  title: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: BookTableItem[] = [
  {
    id: 1,
    title: "The Name of the Wind",
    rating: 10,
    author: "Patrick Rothfuss"
  },
  {
    id: 2,
    title: "Harry Potter and the Chamber of Secrets",
    rating: 8.5,
    author: "JK Rowling"
  },
  {
    id: 3,
    title: "Harry Potter and the Prisoner of Azkban",
    rating: 10,
    author: "JK Rowling"
  },
  {
    id: 4,
    title: "Harry Potter and the Goblet of Fire",
    rating: 10,
    author: "JK Rowling"
  },
  { id: 5, title: "The Red Knight", rating: 10, author: "Miles Cameron" },
  { id: 6, title: "Dunstan", rating: 9, author: "Conn Ignolian" },
  { id: 7, title: "Nitrogen", rating: 1, author: "John Smith" },
  { id: 8, title: "Oxygen", rating: 3, author: "John Smith" },
  { id: 9, title: "Fluorine", rating: 4, author: "John Smith" },
  { id: 10, title: "Neon", rating: 7, author: "John Smith" },
  { id: 11, title: "Sodium", rating: 6, author: "John Smith" },
  { id: 12, title: "Magnesium", rating: 5, author: "John Smith" },
  { id: 13, title: "Aluminum", rating: 1, author: "John Smith" },
  { id: 14, title: "Silicon", rating: 0, author: "John Smith" },
  { id: 15, title: "Phosphorus", rating: 3, author: "John Doe" },
  { id: 16, title: "Sulfur", rating: 8, author: "John Doe" },
  { id: 17, title: "Chlorine", rating: 2.5, author: "John Doe" },
  { id: 18, title: "Argon", rating: 4.5, author: "John Doe" },
  { id: 19, title: "Potassium", rating: 5.5, author: "John Doe" },
  { id: 20, title: "Calcium", rating: 8, author: "John Doe" }
];

/**
 * Data source for the BookTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class BookTableDataSource extends DataSource<BookTableItem> {
  data: BookTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<BookTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(
      map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      })
    );
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
  private getPagedData(data: BookTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: BookTableItem[]) {
    if (!this.sort.active || this.sort.direction === "") {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === "asc";
      switch (this.sort.active) {
        case "title":
          return compare(a.title, b.title, isAsc);
        case "id":
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/title columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
