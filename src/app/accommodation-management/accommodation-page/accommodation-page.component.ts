import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AccommodationService } from '../accommodation.service';
import { AccommodationWithTotalPriceDTO } from '../model/accommodationWithTotalPrice';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css']
})
export class AccommodationPageComponent {

  accommodation: AccommodationWithTotalPriceDTO;

  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private accommodationService: AccommodationService
  ) {}

  ngOnInit(): void {
    const accommodationIdParam = this.route.snapshot.paramMap.get('id');
    if(accommodationIdParam !== null) {
      const accommodationId = +accommodationIdParam;
      this.accommodationService
    .getAccommodation(accommodationId)
    .subscribe((details) => {
      this.accommodation = details;
      this.accommodation.images = this.accommodation.images || [];
    });
    } else {
      console.error("Accommodation ID is null");
    }
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
