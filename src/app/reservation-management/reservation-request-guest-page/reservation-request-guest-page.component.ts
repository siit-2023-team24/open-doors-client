import { Component, OnInit } from '@angular/core';
import { ReservationRequestForGuestDTO } from '../model/reservation-request';
import { SearchAndFilterDTO } from '../model/search-and-filter';
import { ReservationRequestService } from '../reservation-request.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-reservation-request-guest-page',
  templateUrl: './reservation-request-guest-page.component.html',
  styleUrls: ['./reservation-request-guest-page.component.css']
})
export class ReservationRequestGuestPageComponent implements OnInit{
  requestStatuses: string[] = [];
  requests: ReservationRequestForGuestDTO[] = [];
  searchParams: SearchAndFilterDTO = {accommodationName: null, startDate: null, endDate: null, status: null};

  endDateFilter = (date: Date | null): boolean => {
    return date ? date >= (this.searchParams.startDate || new Date()) : true;
  };

  constructor(private requestService: ReservationRequestService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.loadRequestStatuses();
    this.fetchRequests()
  }

  private loadRequestStatuses(): void {
    this.requestService.getReservationStatuses().subscribe(
      (statuses: string[]) => {
        this.requestStatuses = statuses;
      }
    )
  }

  private fetchRequests(): void {
    this.requestService.getAllForGuestId(this.authService.getId()).subscribe(
      (requests: ReservationRequestForGuestDTO[]) => {
        this.requests = requests;
        requests.forEach(request => {
          console.log(request);
        })
      },
      error => {
        console.error("Error fetching requests: ", error);
      }
    )
  }

  searchAndFilterRequests(): void {
    console.log(this.searchParams);

    
  }

}
