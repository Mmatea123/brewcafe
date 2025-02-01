import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coffee, CoffeeService } from '../../../core/services/coffee.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private coffeeService: CoffeeService) { }

  getCoffees(): Observable<Coffee[]> {
    return this.coffeeService.getAllCoffees();
  }

  getCoffee(id: number): Observable<Coffee> {
    return this.coffeeService.getCoffeeById(id);
  }

  // Additional menu-specific business logic can be added here
  filterByCategory(coffees: Coffee[], category: string): Coffee[] {
    return coffees.filter(coffee => coffee.name.toLowerCase().includes(category.toLowerCase()));
  }

  sortByPrice(coffees: Coffee[], ascending: boolean = true): Coffee[] {
    return [...coffees].sort((a, b) => 
      ascending ? a.price - b.price : b.price - a.price
    );
  }
}
