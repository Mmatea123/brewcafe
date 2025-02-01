import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { OrderManagementComponent } from './components/order-management/order-management.component';
import { OrderDetailsDialogComponent } from './components/order-details-dialog/order-details-dialog.component';
import { OrderModule } from '../order/order.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductManagementComponent,
    OrderManagementComponent,
    OrderDetailsDialogComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    OrderModule
  ]
})
export class AdminModule { }
