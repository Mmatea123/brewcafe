// order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {Order, OrderItem} from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';
  private currentOrderSubject = new BehaviorSubject<OrderItem[]>([]);
  currentOrder$ = this.currentOrderSubject.asObservable();

  constructor(private http: HttpClient) {}

  addToOrder(item: OrderItem): void {
    const currentItems = this.currentOrderSubject.value;
    const existingItem = currentItems.find(i => i.coffeeId === item.coffeeId);

    if (existingItem) {
      existingItem.quantity += 1;
      this.currentOrderSubject.next([...currentItems]);
    } else {
      this.currentOrderSubject.next([...currentItems, { ...item, quantity: 1 }]);
    }
  }

  placeOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }
}
