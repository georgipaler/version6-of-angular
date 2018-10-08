import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface MyTableItem {
  name: string;
  id: number;
  src: string;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: MyTableItem[] = [
  {id: 1, name: 'Hydrogen', src: '../../assets/imgs/1.jpg'},
  {id: 2, name: 'Helium', src: '../../assets/imgs/2.jpg'},
  {id: 3, name: 'Lithium', src: '../../assets/imgs/3.jpg'},
  {id: 4, name: 'Beryllium', src: '../../assets/imgs/4.jpg'},
  {id: 5, name: 'Boron', src: '../../assets/imgs/5.jpeg'},
  {id: 6, name: 'Carbon', src: '../../assets/imgs/6.jpeg'},
  {id: 7, name: 'Nitrogen', src: '../../assets/imgs/7.jpeg'},
  {id: 8, name: 'Oxygen', src: '../../assets/imgs/4.jpg'},
  {id: 9, name: 'Fluorine', src: '../../assets/imgs/1.jpg'},
  {id: 10, name: 'Neon', src: '../../assets/imgs/5.jpeg'},
  {id: 11, name: 'Sodium', src: '../../assets/imgs/3.jpg'},
  {id: 12, name: 'Magnesium', src: '../../assets/imgs/4.jpg'},
  {id: 13, name: 'Aluminum', src: '../../assets/imgs/1.jpg'},
  {id: 14, name: 'Silicon', src: '../../assets/imgs/2.jpg'},
  {id: 15, name: 'Phosphorus', src: '../../assets/imgs/6.jpeg'},
  {id: 16, name: 'Sulfur', src: '../../assets/imgs/4.jpg'},
  {id: 17, name: 'Chlorine', src: '../../assets/imgs/1.jpg'},
  {id: 18, name: 'Argon', src: '../../assets/imgs/7.jpeg'},
  {id: 19, name: 'Potassium', src: '../../assets/imgs/3.jpg'},
  {id: 20, name: 'Calcium', src: '../../assets/imgs/4.jpg'},
];

/**
 * Data source for the MyTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MyTableDataSource extends DataSource<MyTableItem> {
  data: MyTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MyTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginators length
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
  private getPagedData(data: MyTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MyTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
