import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MiniCartComponent } from './components/mini-cart/mini-cart.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MiniCartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MiniCartComponent
  ]
})
export class CoreModule { }
