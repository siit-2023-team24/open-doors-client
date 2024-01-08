import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewDetailsDTO } from './model/review-details';
import { environment } from 'src/env/env';
import { HostPublicDataDTO } from './model/host-public-data';
import { NewReviewDTO } from './model/new-review';
import { HostReviewWholeDTO } from './model/host-review-whole';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }

  getReviewsForAccommodation(accommodationId: number) : Observable<ReviewDetailsDTO[]> {
    return this.httpClient.get<ReviewDetailsDTO[]>(environment.apiHost + '/accommodation-reviews/accommodation/' + accommodationId);
  }

  getReviewsForHost(hostId: number, guestId: number) : Observable<HostPublicDataDTO> {
    let params = new HttpParams().set('guestId', guestId.toString());
    return this.httpClient.get<HostPublicDataDTO>(environment.apiHost + '/host-reviews/' + hostId, { params })
  }

  createHostReview(dto: NewReviewDTO) : Observable<HostReviewWholeDTO> {
    return this.httpClient.post<HostReviewWholeDTO>(environment.apiHost + '/host-reviews', dto);
  }
}
