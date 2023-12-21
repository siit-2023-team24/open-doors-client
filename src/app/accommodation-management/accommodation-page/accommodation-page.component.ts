import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import { AccommodationWithTotalPriceDTO } from '../model/accommodationWithTotalPrice';
import { AccommodationType } from 'src/env/accommodation-type';
import { Address } from '../model/address';
import { ImageService } from 'src/app/image-management/image.service';
import { AccommodationReviewDetailsDTO } from 'src/app/review-management/model/accommodationReviewDetails';
import { ReviewService } from 'src/app/review-management/review.service';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css']
})
export class AccommodationPageComponent implements OnInit{

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
    host: "",
    address: {} as Address
  };
  imagePaths: string[] = [];
  accommodationAddress: string = "";
  isAccommodationDetailsReady: boolean = false;
  reviews: AccommodationReviewDetailsDTO[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private imageService: ImageService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {

    //todo

    const accommodationIdParam = this.route.snapshot.paramMap.get('id');
    if(accommodationIdParam !== null) {
      const accommodationId = +accommodationIdParam;
      this.accommodationService
        .getAccommodation(accommodationId)
        .subscribe(
          (details) => {
            this.accommodation = details;
            this.accommodation.images = this.accommodation.images || [];
            this.accommodationAddress = this.accommodation.address.street + " " + this.accommodation.address.number + ", " + this.accommodation.address.city;
            this.isAccommodationDetailsReady = true;
            this.imagePaths = this.accommodation.images.map(id => this.imageService.getPath(id, false));

            this.reviewService.getReviewsForAccommodation(accommodationId)
            .subscribe(reviews => {
              this.reviews = reviews;
            });
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
