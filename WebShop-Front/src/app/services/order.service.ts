import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  public createOrder(order: Order): Observable<any> {
    return this.http.post<any>(`http://localhost:56123/api/orders/checkout`, order);
  }
}
