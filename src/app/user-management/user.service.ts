import { Injectable } from '@angular/core';
import { User } from "./model/user.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/env";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private currentUser: User;

  constructor(private httpClient: HttpClient) { }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(newUser: User) {
    this.currentUser = newUser;
  }


  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(environment.apiHost + '/users/' + id);
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put<User>(environment.apiHost + '/users');
  }


}
