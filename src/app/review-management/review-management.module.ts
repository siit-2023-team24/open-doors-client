import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../infrastucture/material/material.module';
import { ReviewCardComponent } from './review-card/review-card.component';
import { WriteReviewCardComponent } from './write-review-card/write-review-card.component';
import { HostReviewsComponent } from './host-reviews/host-reviews.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ReviewCardComponent,
    WriteReviewCardComponent,
    HostReviewsComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  exports: [
    ReviewCardComponent,
    WriteReviewCardComponent
  ]
})
export class ReviewManagementModule { }
