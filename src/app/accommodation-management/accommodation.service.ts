import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accommodation } from './model/accommodation.model';
import { environment } from 'src/env/env';
import { AccommodationSearchDTO } from './model/accommodationSearch';
import { AccommodationWholeDTO } from './model/accommodationWhole';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private accommodationList: Accommodation[] = [];

  constructor(private httpClient: HttpClient) { }

  getAll() : Observable<AccommodationSearchDTO[]> {
    return this.httpClient.get<AccommodationSearchDTO[]>(environment.apiHost + "/accommodations")
  }

  getAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + '/accommodations/' + id)
  }

  searchAndFilterAccommodations(filterParams: any): Observable<AccommodationSearchDTO[]> {
    // Assume your backend has an endpoint for searching and filtering accommodations
    const searchEndpoint = environment.apiHost + "/accommodations/search";
    return this.httpClient.post<AccommodationSearchDTO[]>(searchEndpoint, filterParams);
  }

  add(accommodationDTO: AccommodationWholeDTO): Observable<AccommodationWholeDTO>{

    return this.httpClient.post<AccommodationWholeDTO>(environment.apiHost + '/accommodations', accommodationDTO);

  }
}
