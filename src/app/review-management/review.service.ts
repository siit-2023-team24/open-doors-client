import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReviewDetailsDTO } from './model/reviewDetails';
import { environment } from 'src/env/env';
import { HostPublicDataDTO } from './model/hostPublicData';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private httpClient: HttpClient) { }

  getReviewsForAccommodation(accommodationId: number) : Observable<ReviewDetailsDTO[]> {
    return this.httpClient.get<ReviewDetailsDTO[]>(environment.apiHost + '/accommodation-reviews/accommodation/' + accommodationId);
  }

  getReviewsForHost(hostId: number) : Observable<HostPublicDataDTO> {
    return this.httpClient.get<HostPublicDataDTO>(environment.apiHost + '/host-reviews/' + hostId)
  }
}
