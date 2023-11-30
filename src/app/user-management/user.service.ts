import { Injectable } from '@angular/core';
import { User } from "./model/user.model"
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private currentUser: User;

  private userList: User[] = [];

  constructor() { }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(newUser: User) {
    this.currentUser = newUser;
  }
}
