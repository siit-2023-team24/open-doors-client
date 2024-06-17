import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AccommodationWithTotalPriceDTO } from './accommodation-management/model/accommodation-with-total-price.model';
import { AccommodationType } from './accommodation-management/model/accommodation-type';
import { AccommodationSeasonalRateDTO } from './accommodation-management/model/accommodation-seasonal-rate';
import { SeasonalRatePricingDTO } from './accommodation-management/model/seasonal-rates-pricing';
@Injectable({
  providedIn: 'root'
})
export class AccommodationStubServiceService {

  constructor() { }
  getAccommodation(id: Number, accommodationId: Number){
    const mocked: AccommodationWithTotalPriceDTO = {id: 1,
      name: "name",
      description: "description",
      location: "45.2642825 19.8333041",
      amenities: [],
      images: [],
      minGuests: 1,
      maxGuests: 1,
      accommodationType: AccommodationType.APARTMENT,
      availability: [],
      price: 100,
      seasonalRates: [],
      isPricePerGuest: true,
      totalPrice: 0,
      averageRating: 0,
      host: "host",
      hostUsername: "hostname",
      country: "Serbia",
      city: "Novi Sad",
      street: "Felegi Tivadara 3",
      number: 36,
      isFavoriteForGuest: false,
      hostId: 1,
      blocked: false
    } 
      return of(mocked);
    }
    getSeasonalRatesForAccommodation(accommodationSeasonalRateDTO: AccommodationSeasonalRateDTO) : Observable<SeasonalRatePricingDTO[]> {
      return of([])
    }
  
}
