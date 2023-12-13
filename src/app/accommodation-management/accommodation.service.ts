import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationWhole } from './model/accommodation-whole';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private http: HttpClient) { }

  add(accommodationDTO: AccommodationWhole): Observable<AccommodationWhole>{

    return this.http.post<AccommodationWhole>('http://localhost:9090/open-doors/accommodations', accommodationDTO);
    
  }
}
