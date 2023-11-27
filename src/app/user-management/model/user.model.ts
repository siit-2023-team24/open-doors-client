export interface User {
    id?: number;
    email: string;
    password?: string;

    imageId: number;

    firstName: string;
    lastName: string;
    
    country: string;
    city: string;
    address: string;
    phone: string;
}
