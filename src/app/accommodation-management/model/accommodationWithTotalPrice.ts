import { Amenity } from "src/env/amenity";
import { DateRange } from "./date-range.model";
import { SeasonalRate } from "./seasonal-rate.model";
import { AccommodationType } from "src/env/accommodation-type";
import { Country } from "src/env/country";


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
    number: number
  }