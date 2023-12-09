import { Country } from "src/env/country";
import { AccommodationType } from "src/env/accommodationType";
import { Amenity } from "src/env/amenity";
import { Price } from "./price";
import { DateRange } from "./date-range";
export interface AccommodationWholeDTO {
    id?: number,
    name: string,
    isAutomatic: boolean,
    description: string,
    country: Country,
    city: string,
    street: string,
    number: number,
    type: AccommodationType,
    minGuests: number,
    maxGuests: number,
    deadline: number
    amenities: Amenity[],

    location: string,
    images: number[],
    
    availability: DateRange[],
    price: number,
    seasonalRates: Price[]

}