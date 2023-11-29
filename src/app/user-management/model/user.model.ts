export interface User {
    id?: number;
    email: string;
    password?: string;
    role?: string;

    imageId: number;

    firstName: string;
    lastName: string;
    
    country: string;
    city: string;
    street: string;
    number: number;
    phone: string;
}

