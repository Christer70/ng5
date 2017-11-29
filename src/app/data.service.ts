import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' })
  
};
@Injectable()

export class DataService {

  private orders = new BehaviorSubject<any>([]);
  order = this.orders.asObservable();
  private ordersUrl = 'http://localhost:51162/api/order';  // URL to web api
  constructor(private http: HttpClient) {}

  changeOrder(order) {
    this.orders.next(order)
  }

  addOrder(order) {
    /*this.http.post(this.ordersUrl, order, httpOptions).subscribe(

      data =>  { console.log(data);
        
      },
      error => { console.log(error)
            },
      ()    => { // Finally
            }


    );*/
    this.orders.next(order)
  }

  updateOrder(order) {
    this.orders.next(order)
  }

  deleteOrder(order) {
    this.orders.next(order)
  }
}






