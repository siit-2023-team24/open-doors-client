import { Amenity } from "src/env/amenity";
import { Address } from "./address";
import { DateRange } from "./date-range.model";
import { SeasonalRate } from "./seasonal-rate.model";
import { AccommodationType } from "src/env/accommodation-type";


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
    address: Address;
  }