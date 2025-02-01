import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../../../core/services/order.service';
import { Order, OrderItem } from '../../../../core/models/order';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  orderItems$ = this.orderService.currentOrder$.pipe(
    tap(items => {
      if (items.length === 0) {
        this.router.navigate(['/menu']);
      }
    })
  );
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {
    this.orderForm = this.fb.group({
      customerName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern('^[0-9]{10}$')]],
      notes: ['']
    });
  }

  ngOnInit(): void {}

  isFieldInvalid(fieldName: string): boolean {
    const field = this.orderForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched || this.submitted)) : false;
  }

  onCancel(): void {
    this.orderService.clearOrder();
    this.router.navigate(['/menu']);
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.orderForm.valid) {
      this.orderItems$.pipe(take(1)).subscribe(items => {
        if (items.length === 0) {
          return;
        }

        const order: Omit<Order, 'id'> = {
          customerName: this.orderForm.value.customerName,
          email: this.orderForm.value.email,
          phone: this.orderForm.value.phone,
          notes: this.orderForm.value.notes,
          items: items,
          total: this.calculateTotal(items),
          status: 'pending',
          date: new Date().toISOString()
        };

        this.orderService.createOrder(order).subscribe({
          next: () => {
            this.orderService.clearOrder();
            this.orderForm.reset();
            this.submitted = false;
            this.router.navigate(['/profile/order-history']);
          },
          error: (error) => {
            console.error('Error creating order:', error);
            // You might want to show an error message to the user here
          }
        });
      });
    }
  }

  private calculateTotal(items: OrderItem[]): number {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
