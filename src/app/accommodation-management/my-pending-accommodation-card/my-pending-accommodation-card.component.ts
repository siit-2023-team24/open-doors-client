import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HostListPendingAccommodation } from '../model/host-list-pending-accommodation';
import { ImageService } from 'src/app/image-management/image.service';
import { AccommodationService } from '../accommodation.service';

@Component({
  selector: 'app-my-pending-accommodation-card',
  templateUrl: './my-pending-accommodation-card.component.html',
  styleUrls: ['../my-accommodation-card/my-accommodation-card.component.css']
})
export class MyPendingAccommodationCardComponent {

  @Input()
  accommodation: HostListPendingAccommodation;

  imagePath: string;

  @Output()
  reload: EventEmitter<number> = new EventEmitter();

  constructor(private imageService: ImageService, private service: AccommodationService) {
  }

  ngOnInit(): void {
    this.imagePath = this.imageService.getPath(this.accommodation.image, false);
  }

  onDelete(): void {
    this.service.deletePending(this.accommodation.id).subscribe({
      next: () => {
        this.reload.emit(this.accommodation.id);
        console.log('Deleted pending accommodation with id: ' + this.accommodation.id);
      },
      error: () => console.log("Error deleting pending accommodation: " + this.accommodation.id)
    })
    
  }

  onEdit(): void {
    console.log("Edit pending");
  }
}
