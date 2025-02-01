import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Order, OrderItem } from '../models/order';

const CART_STORAGE_KEY = 'quickBrewCart';
const MAX_QUANTITY = 10;

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';
  private currentOrderSubject = new BehaviorSubject<OrderItem[]>([]);
  currentOrder$ = this.currentOrderSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      this.currentOrderSubject.next(JSON.parse(savedCart));
    }
  }

  private saveCartToStorage(items: OrderItem[]): void {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.apiUrl);
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  createOrder(order: Omit<Order, 'id'>): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, {
      ...order,
      date: new Date().toISOString()
    });
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Shopping cart functionality
  addToOrder(item: OrderItem): boolean {
    const currentItems = this.currentOrderSubject.value;
    const existingItem = currentItems.find(i => i.id === item.id);

    if (existingItem) {
      if (existingItem.quantity >= MAX_QUANTITY) {
        return false;
      }
      existingItem.quantity += 1;
      const updatedItems = [...currentItems];
      this.currentOrderSubject.next(updatedItems);
      this.saveCartToStorage(updatedItems);
    } else {
      const updatedItems = [...currentItems, { ...item, quantity: 1 }];
      this.currentOrderSubject.next(updatedItems);
      this.saveCartToStorage(updatedItems);
    }
    return true;
  }

  removeFromOrder(itemId: number): void {
    const currentItems = this.currentOrderSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.currentOrderSubject.next(updatedItems);
    this.saveCartToStorage(updatedItems);
  }

  updateItemQuantity(itemId: number, quantity: number): boolean {
    if (quantity > MAX_QUANTITY) {
      return false;
    }
    const currentItems = this.currentOrderSubject.value;
    const updatedItems = currentItems.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    );
    this.currentOrderSubject.next(updatedItems);
    this.saveCartToStorage(updatedItems);
    return true;
  }

  clearOrder(): void {
    this.currentOrderSubject.next([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }

  getSubtotal(): Observable<number> {
    return this.currentOrder$.pipe(
      map(items => items.reduce((total, item) => total + (item.price * item.quantity), 0))
    );
  }

  getTax(): Observable<number> {
    return this.getSubtotal().pipe(
      map(subtotal => subtotal * 0.08) // 8% tax rate
    );
  }

  getOrderTotal(): Observable<number> {
    return this.currentOrder$.pipe(
      map(items => items.reduce((total, item) => total + (item.price * item.quantity), 0))
    );
  }

  // Admin dashboard statistics
  getTotalRevenue(): Observable<number> {
    return this.getOrders().pipe(
      map(orders => orders.reduce((total, order) => total + order.total, 0))
    );
  }

  getTotalOrders(): Observable<number> {
    return this.getOrders().pipe(
      map(orders => orders.filter(order => 
        order.total > 0 && order.items && order.items.length > 0
      ).length)
    );
  }
}
