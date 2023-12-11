import { Amenity } from "src/env/amenity";
import { AccommodationType } from "src/env/accommodation-type";

export interface Accommodation {
    id: number;
    name: string;
    description: string;
    location: string;
    amenities: Amenity[];
    images: Image[];
    minGuests: number;
    maxGuests: number;
    accommodationType: AccommodationType;
    availability: DateRange[];
    price: number;
    isPricePerNight: boolean;
    averageRating: number;
    host: Host;
    seasonalRates: Price[];
    address: Address;
}

interface Image {
// Define Image properties based on your actual implementation
}

interface DateRange {
    startDate: Date;
    endDate: Date;
}

interface Host {
// Define Host properties based on your actual implementation
}

interface Price {
// Define Price properties based on your actual implementation
}

interface Address {
// Define Address properties based on your actual implementation
}
  