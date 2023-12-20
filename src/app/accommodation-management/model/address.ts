import { Country } from "src/env/country";

export interface Address {
    street: string;
    number: number;
    city: string;
    country: Country;
}