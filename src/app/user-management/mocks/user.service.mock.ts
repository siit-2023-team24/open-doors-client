import { Injectable } from "@angular/core";
import { EditUser } from "../model/edit-user.model";
import { Observable, of } from "rxjs";

@Injectable()
export class UserServiceMock {
    constructor() {}

    getUser(id: number): Observable<EditUser> {
        return of(mockUser);
    }

    updateUser(formData: FormData): EditUser {
        return mockEditedUser;
    }
}

export const mockUser: EditUser = {
    id: 1,
    firstName: "Adrien",
    lastName: "Agreste",
    country: "France",
    city: "Paris",
    street: "Rue de Belgrade",
    number: 1,
    phone: "123456789"
};

export const mockEditedUser: EditUser = {
    id: 1,
    firstName: "Nino",
    lastName: "Lahife",
    country: "Germany",
    city: "Berlin",
    street: "Nikola Tesla Strasse",
    number: 2,
    phone: "987654321"
}