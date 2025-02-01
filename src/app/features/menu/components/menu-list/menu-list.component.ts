import { Component, OnInit, OnDestroy, signal, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
import { Coffee } from '../../models/coffee';
import { MenuService } from '../../services/menu.service';
import { OrderService } from '../../../../core/services/order.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, OnDestroy {
  coffees = signal<Coffee[]>([]);
  searchControl = new FormControl('');
  loading = signal(false);
  private destroy$ = new Subject<void>();
  showNotification = signal(false);
  notificationMessage = signal('');

  constructor(
    private menuService: MenuService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCoffees();
    this.setupSearch();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadCoffees() {
    this.loading.set(true);
    this.menuService.getCoffees()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (coffees) => {
          this.coffees.set(coffees);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error loading coffees:', error);
          this.loading.set(false);
        }
      });
  }

  private setupSearch() {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(term => {
        if (term) {
          const filtered = this.coffees().filter(coffee => 
            coffee.name.toLowerCase().includes(term.toLowerCase())
          );
          this.coffees.set(filtered);
        } else {
          this.loadCoffees();
        }
      });
  }

  onCardClick(event: MouseEvent, coffee: Coffee) {
    if (!(event.target instanceof HTMLButtonElement)) {
      this.router.navigate(['/menu', coffee.id]);
    }
  }

  onOrderCoffee(coffee: Coffee) {
    this.orderService.addToOrder({
      id: coffee.id,
      name: coffee.name,
      price: coffee.price,
      quantity: 1
    });
    
    this.notificationMessage.set(`Added ${coffee.name} to cart`);
    this.showNotification.set(true);
    
    setTimeout(() => {
      this.showNotification.set(false);
    }, 3000);
  }
}
