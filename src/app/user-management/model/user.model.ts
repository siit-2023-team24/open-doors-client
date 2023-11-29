import { Country } from "src/env/country";

export interface User {
    id?: number;
    email: string;
    password?: string;
    role: string;

    imageId: number;

    firstName: string;
    lastName: string;
    
    country: Country;
    city: string;
    address: string;
    phone: string;
}
