import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { CoffeeService } from '../../../../core/services/coffee.service';
import { Coffee } from '../../../../core/services/coffee.service';

@Component({
  selector: 'app-product-management',
  templateUrl: './product-management.component.html',
  styleUrls: ['./product-management.component.scss']
})
export class ProductManagementComponent implements OnInit, OnDestroy {
  productForm!: FormGroup;
  coffees: Coffee[] = [];
  editingId: number | null = null;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private coffeeService: CoffeeService
  ) {
    this.createForm();
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  private loadProducts(): void {
    this.coffeeService.getAllCoffees()
      .pipe(takeUntil(this.destroy$))
      .subscribe(coffees => this.coffees = coffees);
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const coffee = this.productForm.value;
      
      if (this.editingId) {
        this.coffeeService.updateCoffee(this.editingId, coffee)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.loadProducts();
            this.resetForm();
          });
      } else {
        this.coffeeService.createCoffee(coffee)
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            this.loadProducts();
            this.resetForm();
          });
      }
    }
  }

  editProduct(coffee: Coffee): void {
    this.editingId = coffee.id;
    this.productForm.patchValue({
      name: coffee.name,
      price: coffee.price,
      description: coffee.description,
      image: coffee.image
    });
  }

  deleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.coffeeService.deleteCoffee(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.loadProducts();
          if (this.editingId === id) {
            this.resetForm();
          }
        });
    }
  }

  private resetForm(): void {
    this.editingId = null;
    this.productForm.reset();
  }
}
