import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewsRoutingModule } from './reviews-routing.module';
import { ReviewListComponent } from './components/review-list/review-list.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { ReviewCardComponent } from './components/review-card/review-card.component';


@NgModule({
  declarations: [
    ReviewListComponent,
    ReviewFormComponent,
    ReviewCardComponent
  ],
  imports: [
    CommonModule,
    ReviewsRoutingModule
  ]
})
export class ReviewsModule { }
