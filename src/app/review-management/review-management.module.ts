import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../infrastucture/material/material.module';
import { ReviewCardComponent } from './review-card/review-card.component';
import { WriteReviewCardComponent } from './write-review-card/write-review-card.component';


import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { MatSidenavModule } from "@angular/material/sidenav";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatTableModule } from "@angular/material/table";
import { MatBadgeModule } from "@angular/material/badge";
@NgModule({
  declarations: [
    ReviewCardComponent,
    WriteReviewCardComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    ReviewCardComponent,
    WriteReviewCardComponent
  ]
})
export class ReviewManagementModule { }