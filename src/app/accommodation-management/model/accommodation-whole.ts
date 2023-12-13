import { Country } from "src/env/country";
import { AccommodationType } from "src/env/accommodation-type";
import { SeasonalRate } from "./seasonal-rate";
import { DateRange } from "./date-range";
export interface AccommodationWhole {
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
    amenities: string[],

    location: string,
    images: number[],
    
    availability: DateRange[],
    price: number,
    isPricePerGuest: boolean,
    seasonalRates: SeasonalRate[]
}