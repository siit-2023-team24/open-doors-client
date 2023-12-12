import { Component, Input } from '@angular/core';
import { HostListAccommodation } from '../model/host-list-accommodation';

@Component({
  selector: 'app-my-accommodation-card',
  templateUrl: './my-accommodation-card.component.html',
  styleUrls: ['./my-accommodation-card.component.css']
})
export class MyAccommodationCardComponent {

  @Input()
  accommodation: HostListAccommodation;

}
