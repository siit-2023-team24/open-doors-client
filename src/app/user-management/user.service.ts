import { Injectable } from '@angular/core';
import { User } from "./model/user.model"
import { Observable } from "rxjs"

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private userList: User[] = [];

  constructor() { }
}
