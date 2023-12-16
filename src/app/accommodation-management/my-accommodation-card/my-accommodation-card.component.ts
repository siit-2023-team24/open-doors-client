import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HostListAccommodation } from '../model/host-list-accommodation';
import { ImageService } from 'src/app/image-management/image.service';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-my-accommodation-card',
  templateUrl: './my-accommodation-card.component.html',
  styleUrls: ['./my-accommodation-card.component.css', '../../../styles.css']
})
export class MyAccommodationCardComponent {


  @Input()
  accommodation: HostListAccommodation;

  imagePath: string;

  @Output()
  reload: EventEmitter<number> = new EventEmitter();
  
  constructor(private service: AccommodationService, private imageService: ImageService) {
  }

  ngOnInit() {
    this.imagePath = this.imageService.getPath(this.accommodation.image, false);
  }

  onDelete() {
    console.log("deleting active");
    this.service.delete(this.accommodation.id).subscribe({
      next: () => {
        this.reload.emit(this.accommodation.id);
        console.log('Deleted accommodation with id: ' + this.accommodation.id);
      },
    })

  }

  onEdit() {
    console.log("Edit active acc.")
  }

}
