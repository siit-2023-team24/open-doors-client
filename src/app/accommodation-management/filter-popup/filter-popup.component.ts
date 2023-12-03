import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.css']
})
export class FilterPopupComponent {
  propertyTypes = ['Entire Home', 'Hotel', 'Studio Apartment', 'Apartment', 'Villa', 'Room', 'Holiday Home', 'Cottage'];
  amenities = ['Wifi', 'Dryer', 'TV', 'Kitchen', 'Air Conditioning', 'Hair Dryer', 'Washer', 'Free Parking'];

  selectedPropertyTypes: { [key: string]: boolean } = {};
  minPrice: number;
  maxPrice: number;
  selectedAmenities: { [key: string]: boolean } = {};

  constructor(public dialogRef: MatDialogRef<FilterPopupComponent>) {}

  applyFilters(): void {

    // filter logic here

    this.dialogRef.close();
  }
}
