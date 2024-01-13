import { Component } from '@angular/core';
import { PendingReview } from '../model/pending-review';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-reviews-admin-page',
  templateUrl: './reviews-admin-page.component.html',
  styleUrls: ['./reviews-admin-page.component.css']
})
export class ReviewsAdminPageComponent {

  pending: PendingReview[] = [];

  noPendingMessage: string = "";

  constructor(private service: ReviewService) {}

  ngOnInit(): void {
    this.service.getPendingReviews().subscribe({
      next: (data: PendingReview[]) => {
        this.pending = data;
        if (data.length == 0)
          this.noPendingMessage = "There are no pending reviews right now.";
      },
      error: () => console.error("Error getting pending reviews ")
    });


  }


  reloadParent(id: number): void {
    this.ngOnInit();
  }
  

}
