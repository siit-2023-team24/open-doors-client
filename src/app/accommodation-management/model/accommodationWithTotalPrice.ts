import { Amenity } from "src/env/amenity";
import { AccommodationType } from "src/env/accommodationType";
import { DateRange } from "./date-range";
import { Price } from "./price";
import { User } from "../../user-management/model/user.model";
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
    seasonalRates: Price[];
    isPricePerNight: boolean;
    totalPrice: number | null;
    averageRating: number | null;
    host: User;
    address: Address;
  }