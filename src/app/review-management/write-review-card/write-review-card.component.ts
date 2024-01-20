import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ReviewService } from '../review.service';
import { HostReviewWholeDTO } from '../model/host-review-whole';
import { NewReviewDTO } from '../model/new-review';
import { AccommodationReviewWholeDTO } from '../model/accommodation-review-whole';
import { SocketService } from 'src/app/shared/socket.service';
import { Message } from 'src/app/shared/model/notification';

@Component({
  selector: 'app-write-review-card',
  templateUrl: './write-review-card.component.html',
  styleUrls: ['./write-review-card.component.css']
})
export class WriteReviewCardComponent {
  
  constructor(private authService: AuthService,
              private reviewService: ReviewService,
              private socketService: SocketService) {}

  @Input() recipientId: number;
  @Input() isHost: boolean;
  @Input() hostUsername: string;
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
          this.reload.emit(response.id);
          console.log(response);

          let message : Message = {
            timestamp: new Date,
            username: this.hostUsername,
            message: "You have a new review.",
            type: "You have a new review."
          }
          this.socketService.sendMessageUsingSocket(message);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    else {
      this.reviewService.createAccommodationReview(dto).subscribe({
        next: (response: AccommodationReviewWholeDTO) => {
          this.reload.emit(response.id);
          console.log(response);

          let message : Message = {
            timestamp: new Date,
            username: this.hostUsername,
            message: "Your accommodation " + response.recipientId + " was just reviewed.",
            type: "Your accommodation was reviewed."
          }
          this.socketService.sendMessageUsingSocket(message);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
