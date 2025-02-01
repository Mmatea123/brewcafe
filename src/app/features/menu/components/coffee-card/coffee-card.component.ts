import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Coffee } from '../../models/coffee';

@Component({
  selector: 'app-coffee-card',
  templateUrl: './coffee-card.component.html',
  styleUrls: ['./coffee-card.component.scss']
})
export class CoffeeCardComponent {
  @Input() coffee!: Coffee;
  @Output() orderCoffee = new EventEmitter<Coffee>();

  onOrder() {
    this.orderCoffee.emit(this.coffee);
  }
}
