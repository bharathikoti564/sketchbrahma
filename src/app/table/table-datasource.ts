import { BehaviorSubject, Observable, of } from 'rxjs';
import { TableService } from './table.service';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { catchError, finalize } from 'rxjs/operators';

// This class needs to implement a couple of methods: connect() and disconnect().
export class TableDataSource implements DataSource<Company> {
    // attorneySubject is a BehaviorSubject, which means its subscribers will always get its latest emitted value.
    private attorneySubject = new BehaviorSubject<Company[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
  paginator: any;
  sort: any;
  filter: string;

    constructor(private referenceService: TableService) { }
    // CollectionViewer, which provides an Observable that emits information about what data is being displayed.
    connect(collectionViewer: CollectionViewer): Observable<Company[]> {
        return this.attorneySubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.attorneySubject.complete();
        this.loadingSubject.complete(); 
    }

    loadAttorney(data:any,sort:any,order:any) {
        this.loadingSubject.next(true);
        this.referenceService.getAttorneyList(data,sort,order)
        .pipe(                        
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )  
        .subscribe((attorney:any) => {
                // if the data arrives successfully from the backend, we are going to emit it back to the data table, 
                // via the connect() Observable
                // for that, we will call next() on the lessonsSubject with the lessons data
                this.attorneySubject.next(attorney);
                this.referenceService.totalCount = attorney['count'];
            });
    }
}
export interface Company {
    id: string;
    name: string;
    progress: string;
    fruit: string;
  }