import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

export interface Coffee {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {
  private apiUrl = 'http://localhost:3000/coffees';
  
  // Using signals for reactive state management
  currentCoffee = signal<Coffee | null>(null);

  constructor(private http: HttpClient) { }

  getAllCoffees(): Observable<Coffee[]> {
    return this.http.get<Coffee[]>(this.apiUrl).pipe(
      map(coffees => coffees.map(coffee => ({
        ...coffee,
        price: Number(coffee.price)
      })))
    );
  }

  getCoffeeById(id: number): Observable<Coffee> {
    return this.http.get<Coffee>(`${this.apiUrl}/${id}`).pipe(
      tap(coffee => this.currentCoffee.set(coffee))
    );
  }

  createCoffee(coffee: Omit<Coffee, 'id'>): Observable<Coffee> {
    return this.http.post<Coffee>(this.apiUrl, coffee);
  }

  updateCoffee(id: number, coffee: Partial<Coffee>): Observable<Coffee> {
    return this.http.patch<Coffee>(`${this.apiUrl}/${id}`, coffee);
  }

  deleteCoffee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
