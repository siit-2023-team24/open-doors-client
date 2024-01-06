import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchAndFilterDTO } from './model/search-and-filter';
import { Observable } from 'rxjs';
import { ReservationRequestForGuestDTO } from './model/reservation-request';
import { environment } from 'src/env/env';
import { ReservationRequestForHost } from './model/reservation-request-for-host';

@Injectable({
  providedIn: 'root'
})
export class ReservationRequestService {

  constructor(private http: HttpClient) { }

  getAllForGuestId(guestId: number): Observable<ReservationRequestForGuestDTO[]> {
    const endpoint = environment.apiHost + "/reservations/all/guest/" + guestId;
    return this.http.get<ReservationRequestForGuestDTO[]>(endpoint);
  }

  getAllForHost(id: number): Observable<ReservationRequestForHost[]> {
    return this.http.get<ReservationRequestForHost[]>(environment.apiHost + "/reservations/host/" + id);
  }

  searchAndFilter(guestId:number, filterParams: SearchAndFilterDTO): Observable<ReservationRequestForGuestDTO[]> {
    const searchEndpoint = environment.apiHost + "/reservations/search/" + guestId;
    return this.http.post<ReservationRequestForGuestDTO[]>(searchEndpoint, filterParams);
  }

  searchAndFilterForHost(hostId: number, filterParams: SearchAndFilterDTO): Observable<ReservationRequestForHost[]> {
    return this.http.post<ReservationRequestForHost[]>(environment.apiHost + "/reservations/host-search/" + hostId, filterParams);
  }

  getReservationStatuses(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiHost + "/reservations/requestStatuses")
  }

  cancelRequest(requestId: number): Observable<Object> {
    const endpoint = environment.apiHost + "/reservations/cancelRequest/" + requestId;
    return this.http.post(endpoint, requestId);
  }

  deleteRequest(requestId: number): Observable<Object> {
    const endpoint = environment.apiHost + "/reservations/deleteRequest/" + requestId;
    return this.http.post(endpoint, requestId);
  }

  confirm(id: number) {
    
  }

  deny(id: number) {

  }
}
