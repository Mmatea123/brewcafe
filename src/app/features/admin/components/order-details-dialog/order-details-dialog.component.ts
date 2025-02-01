import { Component, Input } from '@angular/core';
import { Order } from '../../../../core/models/order';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
  styleUrls: ['./order-details-dialog.component.scss']
})
export class OrderDetailsDialogComponent {
  @Input() order!: Order;
  isVisible = false;

  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
  }
}
