import { Component } from '@angular/core';

@Component({
  selector: 'app-write-review-card',
  templateUrl: './write-review-card.component.html',
  styleUrls: ['./write-review-card.component.css']
})
export class WriteReviewCardComponent {
  stars: boolean[] = [false, false, false, false, false]
  rating: number = 0;

  rateStar(rating: number): void {
    for (let i=0; i<rating; i++) {
      this.stars[i] = true;
    }
    for (let i=rating; i<5; i++) {
      this.stars[i] = false;
    }
    this.rating = rating;
  }
}
