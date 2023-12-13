import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccommodationSearchDTO } from '../model/accommodationSearch';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  @Input()
  accommodation: AccommodationSearchDTO;

  @Output()
  clicked: EventEmitter<AccommodationSearchDTO> = new EventEmitter<AccommodationSearchDTO>();

  onAccommodationClicked(): void {
    this.router.navigate(["/accommodation", this.accommodation.id]);
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
