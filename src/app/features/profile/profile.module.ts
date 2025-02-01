import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailsComponent } from './components/profile-details/profile-details.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { PreferencesComponent } from './components/preferences/preferences.component';


@NgModule({
  declarations: [
    ProfileDetailsComponent,
    OrderHistoryComponent,
    PreferencesComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
