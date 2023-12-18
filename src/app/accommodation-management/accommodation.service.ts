import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationWhole } from './model/accommodation-whole.model';
import { environment } from 'src/env/env';
import { HostListAccommodation } from './model/host-list-accommodation';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  
  constructor(private http: HttpClient) { }

  add(accommodationWhole: AccommodationWhole): Observable<AccommodationWhole>{
    console.log("in service:\n");
    console.log(accommodationWhole);

    return this.http.post<AccommodationWhole>(environment.apiHost + '/pending-accommodations', accommodationWhole);
    
  }

  get(id: number): Observable<AccommodationWhole> {
    return this.http.get<AccommodationWhole>(environment.apiHost + '/accommodations/' + id);
  }

  getPending(id: number): Observable<AccommodationWhole> {
    return this.http.get<AccommodationWhole>(environment.apiHost + '/pending-accommodations/' + id)
  }

  getForHost(hostId: number): Observable<HostListAccommodation[]> {
    return this.http.get<HostListAccommodation[]>(environment.apiHost + '/accommodations/host/' + hostId)
  }

  getPendingForHost(hostId: number): Observable<HostListAccommodation[]> {
    return this.http.get<HostListAccommodation[]>(environment.apiHost + '/pending-accommodations/host/' + hostId)
  }

  delete(id: number): Observable<Object> {
    return this.http.delete(environment.apiHost + '/accommodations/' + id)
  }

  deletePending(id: number): Observable<Object> {
    return this.http.delete(environment.apiHost + '/pending-accommodations/' + id)
  }


}
