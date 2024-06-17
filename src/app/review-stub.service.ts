import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReviewDetailsDTO } from './review-management/model/review-details';
import { AccommodationReviewsDTO } from './review-management/model/accommodation-reviews';
@Injectable({
  providedIn: 'root'
})
export class ReviewStubService {

  constructor() { }
  getReviewsForAccommodation(userId: number, accommodationId: number) : Observable<AccommodationReviewsDTO>{
    return of({reviews : [], isReviewable: false, unapprovedReview: null});
  }
}
