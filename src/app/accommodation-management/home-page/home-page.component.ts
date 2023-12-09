import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { MatDialog } from '@angular/material/dialog';
import { FilterPopupComponent } from '../filter-popup/filter-popup.component';
import { AccommodationSearchDTO } from '../model/accommodationSearch';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css', '../../../styles.css']
})
export class HomePageComponent implements OnInit {
  accommodations: AccommodationSearchDTO[] = [];
  filterParams: any = {};

  constructor(public dialog: MatDialog, private accommodationService: AccommodationService) {}

  ngOnInit(): void {
      this.fetchAccommodations();
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterPopupComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The filter dialog was closed');
       // If the filter dialog returns filter parameters, update the filterParams object
       if (result) {
        this.filterParams = result;
        // Call the method to search and filter accommodations
        this.searchAndFilterAccommodations();
       }
    });
  }

  private fetchAccommodations(): void {
    this.accommodationService.getAll().subscribe(
      (accommodations: AccommodationSearchDTO[]) => {
        this.accommodations = accommodations;
      },
      error => {
        console.error("Error fetching accommodations: ", error);
      }
      
    )
  }

  searchAndFilterAccommodations(): void {
    this.accommodationService.searchAndFilterAccommodations(this.filterParams)
    .subscribe(
      (data) => {
        // Handle the response data from the beckend
        console.log("Backend Response:", data);
        // Update your component with the received data
        // For example, you might have an accommodation array that you bind to in your HTML
        // this.accoommodations = data;
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }
}
