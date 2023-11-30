import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css']
})
export class AccommodationPageComponent {
  images: { url: string; alt: string }[] = [
    { url: '../../assets/accommodation-images/acc1.jpg', alt: 'Image 1' },
    { url: '../../assets/accommodation-images/acc2.jpg', alt: 'Image 2' },
    { url: '../../assets/accommodation-images/acc4.jpg', alt: 'Image 3' },
    { url: '../../assets/accommodation-images/acc5.jpg', alt: 'Image 4' },
    { url: '../../assets/accommodation-images/acc7.jpg', alt: 'Image 5' }
  ];

  constructor(private snackBar: MatSnackBar) {}

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
