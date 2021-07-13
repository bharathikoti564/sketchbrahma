import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TableService {
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    totalCount: any;
constructor(private http: HttpClient){}
    getAttorneyList(data,sort,order){
        let url: string;  
        if(data == ""){
            url =  'http://localhost:3000/data?_sort='+sort +'&_order='+order;
        }  
        else{
            url = 'http://localhost:3000/data?id='+data + '&_sort=' + sort + '&_order=' + order;
        }
        
        this.headers = this.headers.set('Access-Control-Allow-Origin' , '*');
        this.headers = this.headers.set('session_id',"c120d67ad5e844c090ac11e215d977a7")
        return this.http.get(url, { headers: this.headers });
      }
      
}