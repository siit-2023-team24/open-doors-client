import { AccommodationType } from "src/app/accommodation-management/model/accommodation-type";
import { Amenity } from "./amenity";
import { DateRange } from "./date-range.model";
import { SeasonalRate } from "./seasonal-rate.model";
import { Country } from "src/app/shared/model/country";


export interface AccommodationWithTotalPriceDTO {
    id: number;
    name: string;
    description: string;
    location: string;
    amenities: Amenity[];
    images: number[];
    minGuests: number;
    maxGuests: number;
    accommodationType: AccommodationType;
    availability: DateRange[];
    price: number;
    seasonalRates: SeasonalRate[];
    isPricePerGuest: boolean;
    totalPrice: number | null;
    averageRating: number | null;
    host: string;
    country: Country;
    city: string;
    street: string;
    number: number;
    isFavoriteForGuest: boolean;
  }