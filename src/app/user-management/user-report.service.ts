import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class UserReportService {

  constructor(private httpClient: HttpClient) { }

  getReportableUsersForUser(userId: number, isGuestComplainant: boolean) : Observable<string[]> {
    let params = new HttpParams().set('isGuestComplainant', isGuestComplainant.toString());
    return this.httpClient.get<string[]>(environment.apiHost + '/user-reports/' + userId, { params });
  }
}
