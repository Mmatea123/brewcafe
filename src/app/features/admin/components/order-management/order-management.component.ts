import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { OrderService } from '../../../../core/services/order.service';
import { Order } from '../../../../core/models/order';
import { Subject, takeUntil } from 'rxjs';
import { OrderDetailsDialogComponent } from '../order-details-dialog/order-details-dialog.component';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.scss']
})
export class OrderManagementComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  statusFilter = 'all';
  private destroy$ = new Subject<void>();

  @ViewChild(OrderDetailsDialogComponent) orderDetailsDialog!: OrderDetailsDialogComponent;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get filteredOrders(): Order[] {
    // First filter out invalid orders (those with $0 total and no items)
    const validOrders = this.orders.filter(order => 
      order.total > 0 && order.items && order.items.length > 0
    );
    
    // Then apply status filter
    return this.statusFilter === 'all'
      ? validOrders
      : validOrders.filter(order => order.status === this.statusFilter);
  }

  loadOrders(): void {
    this.orderService.getOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe(orders => this.orders = orders);
  }

  updateOrderStatus(order: Order): void {
    this.orderService.updateOrder(order)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  viewOrderDetails(order: Order): void {
    this.orderDetailsDialog.order = order;
    this.orderDetailsDialog.show();
  }
}
