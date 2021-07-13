import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { TableDataSource } from './table-datasource';
import { TableService } from './table.service';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry', 'lychee', 'kiwi', 'mango', 'peach', 'lime', 'pomegranate', 'pineapple'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent{
  displayedColumns: string[] = [ 'id', 'name', 'brewery_type','city','state','created_at','updated_at'];
  // dataSource: MatTableDataSource<UserData>;
  dataSource: TableDataSource;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  data: { search: any; index: any; limit: any; sort_by: "name"; order_by: "ASC"; };
  searchObj: any;
  index: number =0;
  limit: number = 10;
  sortValues: {sort_by:"name",order_by:"ASC"};
  filterValue: string = '';
 

 

  constructor(private tableService:TableService) {
  
  }

  ngOnInit(){
    this.dataSource = new TableDataSource(this.tableService);
    this.dataSource.loadAttorney(this.filterValue,"name","ASC");
  }

  // This paginator and sort queried via @ViewChild observable will emit a new value every time that the user clicks on the paginator navigation buttons or the page size dropdown and sort arrow respectively.
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => {
    this.loadAttorneyPage()
  });
     

}

loadAttorneyPage(){
 let order_by = this.sort.direction;
  let sort_by = this.sort.active;
  this.dataSource.loadAttorney(this.filterValue,sort_by,order_by);
}

  applyFilter(event: Event) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.loadAttorney(this.filterValue,"name","ASC");
  }
}

/** Builds and returns a new User. */
