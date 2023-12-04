import { Country } from "src/env/country";

export interface User {
    id: number;
    email: string;
    password?: string;
    role?: string;

    image: number;

    firstName: string;
    lastName: string;
    
    country: Country;
    city: string;
    street: string;
    number: number;
    phone: string;
}

