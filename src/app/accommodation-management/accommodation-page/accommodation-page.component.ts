import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import { AccommodationWithTotalPriceDTO } from '../model/accommodationWithTotalPrice';
import { AccommodationType } from 'src/env/accommodationType';
import { User } from 'src/app/user-management/model/user.model';
import { Address } from '../model/address';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css']
})
export class AccommodationPageComponent {

  accommodation: AccommodationWithTotalPriceDTO = {
    id: 0,
    name: "",
    description: "",
    location: "",
    amenities: [],
    images: [],
    minGuests: 0,
    maxGuests: 0,
    accommodationType: {} as AccommodationType,
    availability: [],
    price: 0,
    seasonalRates: [],
    isPricePerNight: false,
    totalPrice: null,
    averageRating: null,
    host: {} as User,
    address: {} as Address
  };
  accommodationAddress: string = "";
  isAccommodationDetailsReady: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    const accommodationIdParam = this.route.snapshot.paramMap.get('id');
    if(accommodationIdParam !== null) {
      const accommodationId = +accommodationIdParam;
      this.accommodationService
        .getAccommodation(accommodationId)
        .subscribe(
          (details) => {
            this.accommodation = details;
            console.log("iz subscribea:");
            console.log(this.accommodation);
            this.accommodation.images = this.accommodation.images || [];
            this.accommodationAddress = this.accommodation.address.street + " " + this.accommodation.address.number + ", " + this.accommodation.address.city;
            this.isAccommodationDetailsReady = true;
          },
          (error) => {
            console.error("Error fetching accommodation details:", error);
          }
        );
    } else {
      console.error("Accommodation ID is null");
    }
  }

  isFavorite = false;

  toggleFavorite() {
    if(!this.isFavorite)
      this.showSnackBar('Added to favorites!');  
    else
      this.showSnackBar('Removed from favorites!');

    this.isFavorite = !this.isFavorite;
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
