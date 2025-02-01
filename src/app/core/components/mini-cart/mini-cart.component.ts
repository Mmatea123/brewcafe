import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { OrderItem } from '../../models/order';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

interface CartSummary {
  subtotal: number;
  tax: number;
  total: number;
}

@Component({
  selector: 'app-mini-cart',
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class MiniCartComponent implements OnInit {
  isOpen = false;
  cartItems$ = this.orderService.currentOrder$;
  cartSummary$: Observable<CartSummary>;
  animatingItem: number | null = null;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) {
    this.cartSummary$ = combineLatest([
      this.orderService.getSubtotal(),
      this.orderService.getTax(),
      this.orderService.getOrderTotal()
    ]).pipe(
      map(([subtotal, tax, total]) => ({
        subtotal,
        tax,
        total
      }))
    );
  }

  ngOnInit(): void {}

  getItemTotal(item: OrderItem): number {
    return item.price * item.quantity;
  }

  showQuantityError(): void {
    // TODO: Implement a toast service for better error handling
    alert('Maximum quantity reached (10 items)');
  }

  toggleCart(): void {
    this.isOpen = !this.isOpen;
  }

  updateQuantity(item: OrderItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      if (!this.orderService.updateItemQuantity(item.id, newQuantity)) {
        this.showQuantityError();
        return;
      }
    } else {
      this.removeItem(item.id);
    }
  }

  removeItem(itemId: number): void {
    this.animatingItem = itemId;
    setTimeout(() => {
      this.orderService.removeFromOrder(itemId);
      this.animatingItem = null;
    }, 200);
  }

  checkout(): void {
    this.isOpen = false;
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/order']);
    } else {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: '/order' }
      });
    }
  }
}
