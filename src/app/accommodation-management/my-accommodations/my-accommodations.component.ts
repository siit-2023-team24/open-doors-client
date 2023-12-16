import { Component, OnInit } from '@angular/core';
import { AccommodationService } from '../accommodation.service';
import { HostListAccommodation } from '../model/host-list-accommodation';

@Component({
  selector: 'app-my-accommodations',
  templateUrl: './my-accommodations.component.html',
  styleUrls: ['./my-accommodations.component.css', '../../../styles.css']
})

export class MyAccommodationsComponent implements OnInit {

  accommodations: HostListAccommodation[];

  pending: HostListAccommodation[];

  constructor(private service: AccommodationService) {
  }

  ngOnInit(): void {

    //authorization
    let userId = 1;


    this.service.getForHost(userId).subscribe({
      next: (data: HostListAccommodation[]) => {
        this.accommodations = data;
      },
      error: () => console.error("Error getting host's accommodations.")
    });

    this.service.getPendingForHost(userId).subscribe({
      next: (data: HostListAccommodation[]) => {
        this.pending = data;
      },
      error: () => console.error("Error getting host's pending accommodations.")
    });
    
  }

  reloadParent(id: number): void {
    this.ngOnInit();
  }


}
