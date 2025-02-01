import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderRoutingModule } from './order-routing.module';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';


@NgModule({
  declarations: [
    OrderFormComponent,
    OrderSummaryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OrderRoutingModule
  ],
  exports: [
    OrderSummaryComponent
  ]
})
export class OrderModule { }
