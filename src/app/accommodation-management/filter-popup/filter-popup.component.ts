import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchAndFilterDTO } from '../model/searchAndFilter';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-filter-popup',
  templateUrl: './filter-popup.component.html',
  styleUrls: ['./filter-popup.component.css']
})
export class FilterPopupComponent {
  propertyTypes: string[] = [];
  amenities: string[] = [];

  selectedPropertyTypes: { [key: string]: boolean } = {};
  minPrice: number;
  maxPrice: number;
  selectedAmenities: { [key: string]: boolean } = {};

  constructor(
    public dialogRef: MatDialogRef<FilterPopupComponent>,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    // Load property types and amenities from the backend
    this.loadPropertyTypes();
    this.loadAmenities();
  }

  loadPropertyTypes(): void {
    this.accommodationService.getAccommodationTypes().subscribe(
      (types: string[]) => {
        this.propertyTypes = types;
        this.initializeSelectedPropertyTypes();
      },
      error => {
        console.error("Error loading property types: ", error);
      }
    );
  }

  loadAmenities(): void {
    this.accommodationService.getAmenities().subscribe(
      (amenities: string[]) => {
        this.amenities = amenities;
        this.initializeSelectedAmenities();
      },
      error => {
        console.error("Error loading amenities: ", error);
      }
    );
  }

  initializeSelectedPropertyTypes(): void {
    this.propertyTypes.forEach(type => {
      this.selectedPropertyTypes[type] = false;
    });
  }

  initializeSelectedAmenities(): void {
    this.amenities.forEach(amenity => {
      this.selectedAmenities[amenity] = false;
    });
  }

  applyFilters(): void {
    const selectedTypes = Object.keys(this.selectedPropertyTypes).filter(type => this.selectedPropertyTypes[type]);
    const selectedAmenities = Object.keys(this.selectedAmenities).filter(amenity => this.selectedAmenities[amenity]);

    const filterParams: SearchAndFilterDTO = {
      location: '', // Add the actual location value
      guestNumber: 0, // Add the actual guest number value
      startDate: new Date(), // Add the actual start date value
      endDate: new Date(), // Add the actual end date value
      startPrice: this.minPrice || 0,
      endPrice: this.maxPrice || 0,
      types: selectedTypes,
      amenities: selectedAmenities
    };

    this.dialogRef.close(filterParams);
  }
}
