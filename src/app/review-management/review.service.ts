import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccommodationReviewDetailsDTO } from './model/accommodationReviewDetails';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }

  getReviewsForAccommodation(accommodationId: number) : Observable<AccommodationReviewDetailsDTO[]> {
    return this.httpClient.get<AccommodationReviewDetailsDTO[]>(environment.apiHost + '/accommodation-reviews/accommodation/' + accommodationId);
  }
}
