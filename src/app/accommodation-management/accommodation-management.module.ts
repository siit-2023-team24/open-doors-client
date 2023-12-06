import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { MaterialModule } from '../infrastucture/material/material.module';
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import { MapViewComponent } from './map-view/map-view.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AccommodationPageComponent } from './accommodation-page/accommodation-page.component';
import { MyAccommodationsComponent } from './my-accommodations/my-accommodations.component';
import { ReviewManagementModule } from '../review-management/review-management.module';


import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateAccommodationComponent } from './create-accommodation/create-accommodation.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AccommodationCardComponent,
    MapViewComponent,
    HomePageComponent,
    AccommodationPageComponent,
    MyAccommodationsComponent,
    CreateAccommodationComponent
  ],
  imports: [
    ReactiveFormsModule,
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
    MatCheckboxModule,
    ReviewManagementModule
  ],
  exports: [
    AccommodationCardComponent,
    MapViewComponent,
    HomePageComponent,
    AccommodationPageComponent,
    MyAccommodationsComponent,
  ]
})
export class AccommodationManagementModule { }
