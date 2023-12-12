import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationWholeDTO } from './model/accommodationWhole';
import { HostListAccommodation } from './model/host-list-accommodation';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient) { }

  add(accommodationDTO: AccommodationWholeDTO): Observable<AccommodationWholeDTO>{

    return this.http.post<AccommodationWholeDTO>('http://localhost:9090/open-doors/accommodations', accommodationDTO);

  }

  getForHost(hostId: number): Observable<HostListAccommodation[]> {
    return this.http.get<HostListAccommodation[]>(environment.apiHost + '/accommodations/host/' + hostId)
  }
}
