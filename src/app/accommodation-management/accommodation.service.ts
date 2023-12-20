import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationSearchDTO } from './model/accommodationSearch';
import { AccommodationWhole } from './model/accommodation-whole.model';
import { environment } from 'src/env/env';
import { HostListAccommodation } from './model/host-list-accommodation';
import { AccommodationWholeEdited } from './model/accommodation-whole-edited-model';
import { AccommodationWithTotalPriceDTO } from './model/accommodationWithTotalPrice';
import { SearchAndFilterDTO } from './model/searchAndFilter';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  
  constructor(private http: HttpClient) { }


  add(dto: AccommodationWholeEdited): Observable<AccommodationWholeEdited>{
    console.log("in service:");
    console.log(dto);
    return this.http.post<AccommodationWholeEdited>(environment.apiHost + '/pending-accommodations', dto);
  }


  getAll() : Observable<AccommodationSearchDTO[]> {
    return this.http.get<AccommodationSearchDTO[]>(environment.apiHost + "/accommodations")
  }

  getAccommodation(id: number): Observable<AccommodationWithTotalPriceDTO> {
    return this.http.get<AccommodationWithTotalPriceDTO>(environment.apiHost + '/accommodations/' + id)
  }

  searchAndFilterAccommodations(filterParams: SearchAndFilterDTO): Observable<AccommodationSearchDTO[]> {
    const searchEndpoint = environment.apiHost + "/accommodations/search";
    return this.http.post<AccommodationSearchDTO[]>(searchEndpoint, filterParams);
  }

  addImages(id: number, formData: FormData): Observable<AccommodationWhole> {
    console.error(formData);
    return this.http.post<AccommodationWhole>(environment.apiHost + '/pending-accommodations/' + id + '/images', formData);
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
  
  getAccommodationTypes(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiHost + '/accommodations/accommodationTypes');
  }

  getAmenities(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiHost + '/accommodations/amenities');
  }

}
