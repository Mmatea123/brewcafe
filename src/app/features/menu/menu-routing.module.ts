import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { CoffeeDetailsComponent } from './components/coffee-details/coffee-details.component';

const routes: Routes = [
  {
    path: '',
    component: MenuListComponent
  },
  {
    path: ':id',
    component: CoffeeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
