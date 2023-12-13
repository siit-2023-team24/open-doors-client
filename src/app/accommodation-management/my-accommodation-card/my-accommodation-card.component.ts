import { Component, Input } from '@angular/core';
import { HostListAccommodation } from '../model/host-list-accommodation';
import { ImageService } from 'src/app/image-management/image.service';

@Component({
  selector: 'app-my-accommodation-card',
  templateUrl: './my-accommodation-card.component.html',
  styleUrls: ['./my-accommodation-card.component.css', '../../../styles.css']
})
export class MyAccommodationCardComponent {


  @Input()
  accommodation: HostListAccommodation;

  imagePath: string;

  constructor(private imageService: ImageService) {
  }

  ngOnInit() {
    this.imagePath = this.imageService.getPath(this.accommodation.image, false);
  }

}
