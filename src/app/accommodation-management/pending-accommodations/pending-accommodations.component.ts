import { Component } from '@angular/core';
import { HostListAccommodation } from '../model/host-list-accommodation.model';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-pending-accommodations',
  templateUrl: './pending-accommodations.component.html',
  styleUrls: ['./pending-accommodations.component.css']
})
export class PendingAccommodationsComponent {

  pending: HostListAccommodation[];

  constructor(private service: AccommodationService) {}

  ngOnInit(): void {

    this.service.getAllPending().subscribe({
      next: (data: HostListAccommodation[]) => {
        this.pending = data;
      },
      error: () => console.error("Error getting pending accommodations.")
    });
    
  }

  reloadParent(id: number): void {
    this.ngOnInit();
  }

}
