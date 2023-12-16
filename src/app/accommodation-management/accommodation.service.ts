import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationWholeDTO } from './model/accommodationWhole';
import { HostListAccommodation } from './model/host-list-accommodation';
import { environment } from 'src/env/env';
import { HostListPendingAccommodation } from './model/host-list-pending-accommodation';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient) { }

  add(accommodationDTO: AccommodationWholeDTO): Observable<AccommodationWholeDTO>{

    return this.http.post<AccommodationWholeDTO>(environment.apiHost + '/accommodations', accommodationDTO);

  }

  getPending(id: number): Observable<AccommodationWholeDTO> {
    return this.http.get<AccommodationWholeDTO>(environment.apiHost + '/pending-accommodations/' + id)
  }

  getForHost(hostId: number): Observable<HostListAccommodation[]> {
    return this.http.get<HostListAccommodation[]>(environment.apiHost + '/accommodations/host/' + hostId)
  }

  getPendingForHost(hostId: number): Observable<HostListPendingAccommodation[]> {
    return this.http.get<HostListPendingAccommodation[]>(environment.apiHost + '/pending-accommodations/host/' + hostId)
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(environment.apiHost + '/accommodations/' + id)
  }

  deletePending(id: number): Observable<Object> {
    return this.http.delete(environment.apiHost + '/pending-accommodations/' + id)
  }


}
