import { Amenity } from "src/app/accommodation-management/model/amenity";
import { DateRange } from "./date-range.model";
import { SeasonalRate } from "./seasonal-rate.model";
import { AccommodationType } from "src/app/accommodation-management/model/accommodation-type";
import { Address } from "./address";


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
    isPricePerNight: boolean;
    totalPrice: number | null;
    averageRating: number | null;
    host: string;
    address: Address
  }