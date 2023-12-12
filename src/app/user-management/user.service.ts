import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../env/env";
import { Observable } from "rxjs";
import { User } from "./model/user.model";
import { EditUserDTO } from './model/editUserDTO';
import { NewPasswordDTO } from './model/newPasswordDTO';

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

  updateUser(formData: FormData) {
    return this.httpClient.put(environment.apiHost + '/users', formData);
  }

  changePassword(dto: NewPasswordDTO): Observable<NewPasswordDTO> {
    return this.httpClient.put<NewPasswordDTO>(environment.apiHost + '/users/new-password', dto);
  }
}
