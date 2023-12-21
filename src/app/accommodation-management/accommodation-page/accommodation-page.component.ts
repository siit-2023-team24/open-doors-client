import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import { AccommodationWithTotalPriceDTO } from '../model/accommodation-with-total-price.model';
import { AccommodationType } from 'src/app/accommodation-management/model/accommodation-type';
import { Address } from '../model/address';
import { ImageService } from 'src/app/image-management/image.service';
import { AccommodationReviewDetailsDTO } from 'src/app/review-management/model/accommodationReviewDetails';
import { ReviewService } from 'src/app/review-management/review.service';
import { MakeReservationRequestDTO } from '../model/reservationRequest';
import { ReservationRequestService } from '../reservation-request.service';
import { Country } from 'src/app/shared/model/country';
import { AuthService } from 'src/app/auth/auth.service';

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
    isPricePerGuest: false,
    totalPrice: null,
    averageRating: null,
    host: "",
    country: {} as Country,
    city: "",
    street: "",
    number: 0
  };
  imagePaths: string[] = [];
  accommodationAddress: string = "";
  isAccommodationDetailsReady: boolean = false;
  reviews: AccommodationReviewDetailsDTO[] = [];
  request: MakeReservationRequestDTO;
  isReservationButtonDisabled: boolean = true;
  isGuest: boolean = false;

  selectedStartDate: Date;
  selectedEndDate: Date;
  selectedGuestNumber: number;
  numberOfNights: number;

  startDateFilter = (date: Date | null): boolean => {
    return date ? date >= new Date() && (!this.selectedEndDate || date <= this.selectedEndDate) : true;
  };  

  endDateFilter = (date: Date | null): boolean => {
    return date ? date >= (this.selectedStartDate || new Date()) : true;
  };

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private accommodationService: AccommodationService,
    private imageService: ImageService,
    private reviewService: ReviewService,
    private reservationService: ReservationRequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    //todo

    this.isGuest = (this.authService.getRole() || "") == "ROLE_GUEST";

    const accommodationIdParam = this.route.snapshot.paramMap.get('id');
    if(accommodationIdParam !== null) {
      const accommodationId = +accommodationIdParam;
      this.accommodationService
        .getAccommodation(accommodationId)
        .subscribe(
          (details) => {
            this.accommodation = details;
            this.accommodation.images = this.accommodation.images || [];
            console.log(this.accommodation);
            this.accommodationAddress = this.accommodation.street + " " + this.accommodation.number + ", " + this.accommodation.city;
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

  onInput(){
    if(this.selectedStartDate == null || this.selectedEndDate == null || this.selectedGuestNumber == null ||
      (this.selectedGuestNumber < this.accommodation.minGuests) || (this.selectedGuestNumber > this.accommodation.maxGuests))
       { this.isReservationButtonDisabled = true;}
    else {
        this.isReservationButtonDisabled = false;
        this.numberOfNights = this.calculateNightsBetweenDates(this.selectedStartDate, this.selectedEndDate);
        this.accommodation.totalPrice = this.accommodation.price * this.numberOfNights;
        console.log(this.accommodation); // normal has pricePerNight set to true
        console.log(this.accommodation.isPricePerGuest); // undefined
        if(!this.accommodation.isPricePerGuest) {
          this.accommodation.totalPrice *= this.selectedGuestNumber;
        }
    }
  }

  makeReservationRequest() {
    this.request = {
      accommodationId: this.accommodation.id,
      guestId: this.authService.getId(),
      numberOfGuests: this.selectedGuestNumber,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate,
      totalPrice: this.accommodation.totalPrice
    }

    console.log(this.request);
    
    this.reservationService.makeReservation(this.request).subscribe(
      (response) => {
        this.showSnackBar('Reservation request successful!');
      },
      (error) => {
        console.error('Error making reservation request:', error);
        this.showSnackBar('Error making reservation request. Please try again.');
      }
    );
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

  private calculateNightsBetweenDates(startDate: Date, endDate: Date): number {
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  
    const startUtc = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const endUtc = Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
  
    const timeDifferenceInDays = Math.floor((endUtc - startUtc) / oneDayInMilliseconds);
  
    return timeDifferenceInDays;
  }
}
