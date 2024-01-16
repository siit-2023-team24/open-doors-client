import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ReviewService } from '../review.service';
import { HostReviewWholeDTO } from '../model/host-review-whole';
import { NewReviewDTO } from '../model/new-review';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AccommodationReviewWholeDTO } from '../model/accommodation-review-whole';

@Component({
  selector: 'app-write-review-card',
  templateUrl: './write-review-card.component.html',
  styleUrls: ['./write-review-card.component.css']
})
export class WriteReviewCardComponent {
  constructor(private authService: AuthService,
              private reviewService: ReviewService,
              private router: Router) {}

  @Input() recipientId: number;
  @Input() isHost: boolean;
  stars: boolean[] = [false, false, false, false, false]
  rating: number = 0;
  noRating: boolean = false;
  comment: string = '';

  @Output()
  reload: EventEmitter<number> = new EventEmitter();

  rateStar(rating: number): void {
    this.noRating = false;
    for (let i=0; i<rating; i++) {
      this.stars[i] = true;
    }
    for (let i=rating; i<5; i++) {
      this.stars[i] = false;
    }
    this.rating = rating;
  }

  refresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const currentUrl = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  saveReview(): void {
    if(this.rating==0) {
      this.noRating = true;
      return;
    }
    const dto: NewReviewDTO = {
      authorId: this.authService.getId(),
      rating: this.rating,
      comment: this.comment,
      recipientId: this.recipientId
    }

    if(this.isHost) {
      this.reviewService.createHostReview(dto).subscribe({
        next: (response: HostReviewWholeDTO) => {
          this.reload.emit(1);
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      this.reviewService.createAccommodationReview(dto).subscribe({
        next: (response: AccommodationReviewWholeDTO) => {
          this.reload.emit(1);
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
