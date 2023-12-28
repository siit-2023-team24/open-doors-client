import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchAndFilterDTO } from './model/search-and-filter';
import { Observable } from 'rxjs';
import { ReservationRequestForGuestDTO } from './model/reservation-request';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class ReservationRequestService {

  constructor(private http: HttpClient) { }

  getAllForGuestId(guestId: number): Observable<ReservationRequestForGuestDTO[]> {
    const searchEndpoint = environment.apiHost + "/reservations/all/guest/" + guestId;
    return this.http.get<ReservationRequestForGuestDTO[]>(searchEndpoint);
  }

  searchAndFilter(guestId:number, filterParams: SearchAndFilterDTO): Observable<ReservationRequestForGuestDTO[]> {
    const searchEndpoint = environment.apiHost + "/reservations/search/" + guestId;
    return this.http.post<ReservationRequestForGuestDTO[]>(searchEndpoint, filterParams);
  }

  getReservationStatuses(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiHost + "/reservations/requestStatuses")
  }

}
