import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { NewUserReportDTO } from './model/new-user-report';
import { UserReportDTO } from './model/user-report';

@Injectable({
  providedIn: 'root'
})
export class UserReportService {

  constructor(private httpClient: HttpClient) { }

  getReportableUsersForUser(userId: number, isGuestComplainant: boolean) : Observable<string[]> {
    let params = new HttpParams().set('isGuestComplainant', isGuestComplainant.toString());
    return this.httpClient.get<string[]>(environment.apiHost + '/user-reports/' + userId, { params });
  }

  createUserReview(dto: NewUserReportDTO) : Observable<UserReportDTO> {
    return this.httpClient.post<UserReportDTO>(environment.apiHost + '/user-reports', dto);
  }

  getAll(): Observable<UserReportDTO[]> {
    return this.httpClient.get<UserReportDTO[]>(environment.apiHost + '/user-reports');
  }
}
