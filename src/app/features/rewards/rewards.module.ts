import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardsRoutingModule } from './rewards-routing.module';
import { PointsSummaryComponent } from './components/points-summary/points-summary.component';
import { RewardsListComponent } from './components/rewards-list/rewards-list.component';
import { RedeemRewardsComponent } from './components/redeem-rewards/redeem-rewards.component';


@NgModule({
  declarations: [
    PointsSummaryComponent,
    RewardsListComponent,
    RedeemRewardsComponent
  ],
  imports: [
    CommonModule,
    RewardsRoutingModule
  ]
})
export class RewardsModule { }
