import { AccommodationType } from "src/env/accommodationType";
import { Amenity } from "src/env/amenity";

export interface SearchAndFilterDTO {
  location: string;
  guestNumber: number;
  startDate: Date;
  endDate: Date;
  startPrice: number;
  endPrice: number;
  types: string[];
  amenities: string[];
}
