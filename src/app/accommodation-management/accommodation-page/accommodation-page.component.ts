import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import { AccommodationWithTotalPriceDTO } from '../model/accommodation-with-total-price.model';
import { AccommodationType } from 'src/app/accommodation-management/model/accommodation-type';
import { ImageService } from 'src/app/image-management/image.service';
import { ReviewDetailsDTO } from 'src/app/review-management/model/review-details';
import { ReviewService } from 'src/app/review-management/review.service';
import { MakeReservationRequestDTO } from '../model/reservationRequest';
import { ReservationRequestService } from '../reservation-request.service';
import { Country } from 'src/app/shared/model/country';
import { AuthService } from 'src/app/auth/auth.service';
import { SeasonalRatePricingDTO } from '../model/seasonal-rates-pricing';
import { AccommodationSeasonalRateDTO } from '../model/accommodation-seasonal-rate';
import { AccommodationFavoritesDTO } from '../model/accommodation-favorites';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css', './../../../styles.css']
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
    country: "",
    city: "",
    street: "",
    number: 0,
    isFavoriteForGuest: false,
    hostId: 0
  };
  imagePaths: string[] = [];
  accommodationAddress: string = "";
  isAccommodationDetailsReady: boolean = false;
  reviews: ReviewDetailsDTO[] = [];
  request: MakeReservationRequestDTO;
  isReservationButtonDisabled: boolean = true;
  isGuest: boolean = false;

  selectedStartDate: Date;
  selectedEndDate: Date;
  selectedGuestNumber: number;
  numberOfNights: number;

  
  accommodationSeasonalRateDTO: AccommodationSeasonalRateDTO;
  seasonalRates: SeasonalRatePricingDTO[] = [];

  startDateFilter = (date: Date | null): boolean => {
    if (!date || !this.accommodation.availability) {
      return true;
    }
  
    const isDateInRange = this.accommodation.availability.some(range => {
      const startDate = new Date(range.startDate);
      const endDate = new Date(range.endDate);
      return date >= startDate && date <= endDate;
    });
  
    const otherConditions = date >= new Date() && (!this.selectedEndDate || date < this.selectedEndDate);
  
    const isStartDateInRange = !this.selectedEndDate || this.accommodation.availability.some(range => {
      const startDate = new Date(range.startDate);
      const endDate = new Date(range.endDate);
      return date >= startDate && this.selectedEndDate <= endDate;
    });
  
    return isDateInRange && otherConditions && isStartDateInRange;
  };

  endDateFilter = (date: Date | null): boolean => {
    if (!date || !this.accommodation.availability) {
      return true;
    }
  
    const isDateInRange = this.accommodation.availability.some(range => {
      const startDate = new Date(range.startDate);
      const endDate = new Date(range.endDate);
      return date >= startDate && date <= endDate;
    });
  
    const otherConditions = date >= new Date() && (!this.selectedStartDate || date >= this.selectedStartDate);
    
    const isEndDateInRange = !this.selectedStartDate || this.accommodation.availability.some(range => {
      const startDate = new Date(range.startDate);
      const endDate = new Date(range.endDate);
      return this.selectedStartDate >= startDate && date <= endDate;
    });
  
    return isDateInRange && otherConditions && isEndDateInRange;
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

    const pendingParam = this.route.snapshot.paramMap.get('id');
    const accommodationIdParam = this.route.snapshot.paramMap.get('accommodationId');
    let accommodationId: number | null;
    let pendingId : number | null
    if (accommodationIdParam == null) {
      accommodationId = null;
    } else {
      accommodationId = + accommodationIdParam;
    }
    
    if (pendingParam == null) {
      pendingId = null;
    } else {
      pendingId = + pendingParam;
    }


    if(this.isGuest) {
      this.accommodationService.getAccommodationWhenGuest(accommodationId, this.authService.getId()).subscribe(
        (details) => {
          this.accommodation = details;
          this.accommodation.images = this.accommodation.images || [];
          console.log(this.accommodation);
          this.accommodationAddress = this.accommodation.street + " " + this.accommodation.number + ", " + this.accommodation.city;
          this.isAccommodationDetailsReady = true;
          this.imagePaths = this.accommodation.images.map(id => this.imageService.getPath(id, false));
          if (accommodationId!==null){
            this.reviewService.getReviewsForAccommodation(accommodationId).subscribe(reviews => {
              this.reviews = reviews;
            });
          }
        },
        (error) => {
          console.error("Error fetching accommodation details:", error);
        }
      );
    } else {
      this.accommodationService.getAccommodation(pendingId, accommodationId).subscribe(
        (details) => {
          this.accommodation = details;
          this.accommodation.images = this.accommodation.images || [];
          console.log(this.accommodation);
          this.accommodationAddress = this.accommodation.street + " " + this.accommodation.number + ", " + this.accommodation.city;
          this.isAccommodationDetailsReady = true;
          this.imagePaths = this.accommodation.images.map(id => this.imageService.getPath(id, false));
          if (accommodationId!==null){
            this.reviewService.getReviewsForAccommodation(accommodationId).subscribe(reviews => {
              this.reviews = reviews;
            });
          }
        },
        (error) => {
          console.error("Error fetching accommodation details:", error);
        }
      );
    }
    
  }

  onInput(){
    if(this.selectedStartDate == null || this.selectedEndDate == null || this.selectedGuestNumber == null ||
      (this.selectedGuestNumber < this.accommodation.minGuests) || (this.selectedGuestNumber > this.accommodation.maxGuests))
       { this.isReservationButtonDisabled = true;}
    else {
        this.getSeasonalRatesForAccommodation();
        this.isReservationButtonDisabled = false;
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

  getSeasonalRatesForAccommodation() {
    console.log("pozvali smo seasonalRates")
    this.accommodationSeasonalRateDTO = {
      accommodationId : this.accommodation.id,
      startDate: this.selectedStartDate,
      endDate: this.selectedEndDate
    }

    this.accommodationService.getSeasonalRatesForAccommodation(this.accommodationSeasonalRateDTO).subscribe(
      (seasonalRates) => {
        this.seasonalRates = seasonalRates;
        this.calculateTotalPrice();
        console.log(seasonalRates);
      },
      (error) => {
        console.error('Error fetching seasonal rates:', error);
      }
    );
    
  }

  isFavorite = false;

  toggleFavorite() {
    const guestId = this.authService.getId();
    const accommodationId = this.accommodation.id;
    const favoritesDTO: AccommodationFavoritesDTO = { guestId, accommodationId };

    if(!this.accommodation.isFavoriteForGuest) {  
      this.accommodationService.addToFavorites(favoritesDTO).subscribe(
        () => {
          this.showSnackBar('Added to favorites!');
        },
        (error) => {
          console.error("Error adding to favorites: ", error);
        }
      );
    }
    else {
      this.accommodationService.removeFromFavorites(favoritesDTO).subscribe(
        () => {
          this.showSnackBar('Removed from favorites!');
        },
        (error) => {
          console.error("Error removing from favorites: ", error);
        }
      );
    }
    this.accommodation.isFavoriteForGuest = !this.accommodation.isFavoriteForGuest;
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }

  private calculateTotalPrice() {
    this.accommodation.totalPrice = 0;
    for (let seasonalRate of this.seasonalRates) {
      this.accommodation.totalPrice += seasonalRate.price * seasonalRate.numberOfNights;
    }

    if(this.accommodation.isPricePerGuest) {
      this.accommodation.totalPrice *= this.selectedGuestNumber;
    }
  }
}
