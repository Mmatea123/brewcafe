// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  {
    path: 'reviews',
    loadChildren: () => import('./features/reviews/reviews.module')
      .then(m => m.ReviewsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./features/profile/profile.module')
      .then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'rewards',
    loadChildren: () => import('./features/rewards/rewards.module')
      .then(m => m.RewardsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'menu',
    loadChildren: () => import('./features/menu/menu.module')
      .then(m => m.MenuModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./features/order/order.module')
      .then(m => m.OrderModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.module')
      .then(m => m.AdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module')
      .then(m => m.AuthModule)
  },
  { path: '**', redirectTo: '/menu' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
