import { Injectable } from '@angular/core';
import { User } from "./model/user.model"
import { BehaviorSubject, Observable, throwError } from "rxjs"
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserTokenState } from './model/user-token-state.model';
import { Account } from './model/account';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserAccount } from './model/user-account.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // skip: 'true',
  });

  private currentUser: User;

  private userList: User[] = [];

  user$ = new BehaviorSubject("");
  userState = this.user$.asObservable();
  constructor(private httpClient: HttpClient) { }


  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(newUser: User) {
    this.currentUser = newUser;
  }

  login(auth: Account): Observable<UserTokenState> {
    return this.httpClient.post<UserTokenState>('http://localhost:9090/open-doors/auth/login', auth, {
      headers: this.headers,
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error);
      })
    );;
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != null;
  }

  // getRole(): string {
  //   if (!this.isLoggedIn()) return '';
  //   const accessToken: any = localStorage.getItem('user');
  //   const helper = new JwtHelperService();
  //   return helper.decodeToken(accessToken).role[0].authority;
  // }

  // setUser(): void {
  //   this.user$.next(this.getRole());
  // }

  register(user: UserAccount): Observable<UserAccount> {
    return this.httpClient.post<UserAccount>('http://localhost:9090/open-doors/auth/register', user, {
      headers: this.headers,
    });
  }

  activateUser(id: number): Observable<String> {
    return this.httpClient.post<String>('http://localhost:9090/open-doors/auth/activate-user/' + id, null, {headers: this.headers});
  }
}
