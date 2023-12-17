import { Injectable } from '@angular/core';
import { User } from "./model/user.model"
import { BehaviorSubject, Observable } from "rxjs"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserTokenState } from './model/user-token-state.model';
import { Account } from './model/account';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  private currentUser: User;

  private userList: User[] = [];

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();
  constructor(private http: HttpClient) { }


  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(newUser: User) {
    this.currentUser = newUser;
  }

  login(auth: Account): Observable<UserTokenState> {
    return this.http.post<UserTokenState>('http://localhost:9090/open-doors/auth/login', auth, {
      headers: this.headers,
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  getRole(): string {
    if (!this.isLoggedIn()) return '';
    const accessToken: any = localStorage.getItem('user');
    const helper = new JwtHelperService();
    return helper.decodeToken(accessToken).role[0].authority;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }
}
