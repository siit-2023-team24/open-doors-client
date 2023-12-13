import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';
import { AccommodationSearchDTO } from './model/accommodationSearch';
import { AccommodationWholeDTO } from './model/accommodationWhole';
import { AccommodationWithTotalPriceDTO } from './model/accommodationWithTotalPrice';
import { SearchAndFilterDTO } from './model/searchAndFilter';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private httpClient: HttpClient) { }

  getAll() : Observable<AccommodationSearchDTO[]> {
    return this.httpClient.get<AccommodationSearchDTO[]>(environment.apiHost + "/accommodations")
  }

  getAccommodation(id: number): Observable<AccommodationWithTotalPriceDTO> {
    return this.httpClient.get<AccommodationWithTotalPriceDTO>(environment.apiHost + '/accommodations/' + id)
  }

  searchAndFilterAccommodations(filterParams: SearchAndFilterDTO): Observable<AccommodationSearchDTO[]> {
    const searchEndpoint = environment.apiHost + "/accommodations/search";
    return this.httpClient.post<AccommodationSearchDTO[]>(searchEndpoint, filterParams);
  }

  add(accommodationDTO: AccommodationWholeDTO): Observable<AccommodationWholeDTO>{

    return this.httpClient.post<AccommodationWholeDTO>(environment.apiHost + '/accommodations', accommodationDTO);

  }

  getAccommodationTypes(): Observable<string[]> {
    return this.httpClient.get<string[]>(environment.apiHost + '/accommodationTypes');
  }

  getAmenities(): Observable<string[]> {
    return this.httpClient.get<string[]>(environment.apiHost + '/amenities');
  }
}
