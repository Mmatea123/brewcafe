import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { CoffeeCardComponent } from './components/coffee-card/coffee-card.component';
import { CoffeeDetailsComponent } from './components/coffee-details/coffee-details.component';
import { MenuRoutingModule } from './menu-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MenuListComponent,
    CoffeeCardComponent,
    CoffeeDetailsComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MenuModule { }
