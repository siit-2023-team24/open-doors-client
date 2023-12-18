import { Injectable } from '@angular/core';
import { User } from "./model/user.model"
import { BehaviorSubject, Observable, throwError } from "rxjs"
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { UserTokenState } from './model/user-token-state.model';
import { Account } from './model/account';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from "../../env/env";
import { EditUserDTO } from './model/editUserDTO';
import { NewPasswordDTO } from './model/newPasswordDTO';
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
    return this.httpClient.post<UserTokenState>(environment.apiHost + '/auth/login', auth, {
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
    return this.httpClient.post<UserAccount>(environment.apiHost + '/auth/register', user, {
      headers: this.headers,
    });
  }

  activateUser(id: number): Observable<String> {
    return this.httpClient.post<String>(environment.apiHost + '/auth/activate-user/' + id, null, {headers: this.headers});
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
