// app.component.ts
import { Component } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  template: `
   <div class="app-container">
     <header class="header">
       <nav class="nav">
         <a routerLink="/menu" class="brand">Quick Brew Café</a>
         <div class="nav-links">
           <a routerLink="/menu">Menu</a>
           <a routerLink="/order">Order</a>
           <ng-container *ngIf="isLoggedIn$ | async">
             <a routerLink="/admin">Admin</a>
             <button (click)="logout()">Logout</button>
           </ng-container>
           <ng-container *ngIf="!(isLoggedIn$ | async)">
             <a routerLink="/auth/login">Login</a>
           </ng-container>
         </div>
       </nav>
     </header>

     <main class="main">
       <router-outlet></router-outlet>
     </main>

     <footer class="footer">
       <p>&copy; 2025 Quick Brew Café. All rights reserved.</p>
     </footer>
   </div>
 `,
  styles: [`
   .app-container {
     min-height: 100vh;
     display: flex;
     flex-direction: column;
   }
   .header {
     background: #8b4513;
     padding: 1rem;
   }
   .nav {
     display: flex;
     justify-content: space-between;
     align-items: center;
     max-width: 1200px;
     margin: 0 auto;
     width: 100%;
   }
   .brand {
     color: white;
     font-size: 1.5rem;
     text-decoration: none;
   }
   .nav-links a, .nav-links button {
     color: white;
     text-decoration: none;
     margin-left: 1.5rem;
   }
   .main {
     flex: 1;
     padding: 2rem;
     max-width: 1200px;
     margin: 0 auto;
     width: 100%;
   }
   .footer {
     background: #333;
     color: white;
     padding: 1rem;
     text-align: center;
   }
 `]
})
export class AppComponent {
  isLoggedIn$ = this.authService.isAuthenticated$;

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}
