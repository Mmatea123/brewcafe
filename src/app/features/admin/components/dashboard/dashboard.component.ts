import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { CoffeeService } from '../../../../core/services/coffee.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  totalOrders = 0;
  totalRevenue = 0;
  totalProducts = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private orderService: OrderService,
    private coffeeService: CoffeeService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadStats(): void {
    this.orderService.getTotalOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe(total => this.totalOrders = total);

    this.orderService.getTotalRevenue()
      .pipe(takeUntil(this.destroy$))
      .subscribe(revenue => this.totalRevenue = revenue);

    this.coffeeService.getAllCoffees()
      .pipe(takeUntil(this.destroy$))
      .subscribe(coffees => this.totalProducts = coffees.length);
  }
}
