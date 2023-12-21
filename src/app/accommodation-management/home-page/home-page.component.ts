import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterPopupComponent } from '../filter-popup/filter-popup.component';
import { AccommodationSearchDTO } from '../model/accommodation-search.model';
import { SearchAndFilterDTO } from '../model/search-and-filter.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css', '../../../styles.css']
})
export class HomePageComponent implements OnInit {
  accommodations: AccommodationSearchDTO[] = [];
  filterParams: SearchAndFilterDTO = { location: null, guestNumber: null, startDate: null, endDate: null, startPrice: null, endPrice: null, types: [], amenities: [] };
  searchBarValues: SearchAndFilterDTO = { location: null, guestNumber: null, startDate: null, endDate: null, startPrice: null, endPrice: null, types: [], amenities: [] };
  // Datepicker filters
  startDateFilter = (date: Date | null): boolean => {
    return date ? date >= new Date() && (!this.searchBarValues.endDate || date <= this.searchBarValues.endDate) : true;
  };  

  endDateFilter = (date: Date | null): boolean => {
    return date ? date >= (this.searchBarValues.startDate || new Date()) : true;
  };
  
  constructor(public dialog: MatDialog, 
              private accommodationService: AccommodationService) {}

  ngOnInit(): void {
      this.fetchAccommodations();
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterPopupComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filterParams = result;
        this.searchAndFilterAccommodations();
      }
    });
  }

  private fetchAccommodations(): void {
    this.accommodationService.getAll().subscribe(
      (accommodations: AccommodationSearchDTO[]) => {
        this.accommodations = accommodations;
        accommodations.forEach(accommodation => {
          console.log(accommodation);
        });
      },
      error => {
        console.error("Error fetching accommodations: ", error);
      }
      
    )
  }

  searchAndFilterAccommodations(): void {
    const searchBarValues = this.searchBarValues;

    const combinedParams: SearchAndFilterDTO = {
      location: searchBarValues.location,
      guestNumber: searchBarValues.guestNumber,
      startDate: searchBarValues.startDate,
      endDate: searchBarValues.endDate,
      startPrice: this.filterParams.startPrice,
      endPrice: this.filterParams.endPrice,
      types: this.filterParams.types,
      amenities: this.filterParams.amenities,
    };

    console.log(combinedParams);

    this.accommodationService.searchAndFilterAccommodations(combinedParams)
    .subscribe(
      (data) => {
        console.log("Backend Response:", data);
        this.accommodations = data;
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

}
