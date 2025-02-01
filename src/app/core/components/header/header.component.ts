import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isLoggedIn = false;
  isAdmin = false;
  orderCount$ = this.orderService.currentOrder$.pipe(
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );

  constructor(
    private authService: AuthService,
    private router: Router,
    private orderService: OrderService
  ) {
    this.authService.isAuthenticated$.subscribe(
      isAuth => this.isLoggedIn = isAuth
    );
    this.authService.isAdmin$.subscribe(
      isAdmin => this.isAdmin = isAdmin
    );
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
