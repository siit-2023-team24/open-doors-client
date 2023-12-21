import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccommodationSearchDTO } from '../model/accommodation-search.model';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/image-management/image.service';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {
  constructor(private snackBar: MatSnackBar, private router: Router, private imageService: ImageService) {}

  @Input()
  accommodation: AccommodationSearchDTO;

  @Output()
  clicked: EventEmitter<AccommodationSearchDTO> = new EventEmitter<AccommodationSearchDTO>();

  onAccommodationClicked(): void {
    this.router.navigate(["/accommodation/null", this.accommodation.id]);
  }

  getImagePath(): string {
    return this.imageService.getPath(this.accommodation.image, false);
  }

  isFavorite = false;

  toggleFavorite() {
    if(!this.isFavorite)
      this.showSnackBar('Added to favorites!');  
    else
      this.showSnackBar('Removed from favorites!');

    this.isFavorite = !this.isFavorite;
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
