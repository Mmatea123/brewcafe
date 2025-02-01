import { Component, Input } from '@angular/core';
import { OrderItem } from '../../../../core/models/order';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent {
  @Input() items: OrderItem[] = [];

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
