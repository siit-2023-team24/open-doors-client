import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../review.service';
import { HostPublicDataDTO } from '../model/host-public-data';
import { ImageService } from 'src/app/image-management/image.service';
import { ReviewDetailsDTO } from '../model/review-details';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-host-reviews',
  templateUrl: './host-reviews.component.html',
  styleUrls: ['./host-reviews.component.css']
})
export class HostReviewsComponent implements OnInit {
  imgPath: string;
  username: string;
  name: string;
  isReviewable: boolean;
  hostId: number;
  reviews: ReviewDetailsDTO[] = [];
  constructor(private route: ActivatedRoute,
    private reviewService: ReviewService,
    private imageService: ImageService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.hostId = +params['hostId'];
      let guestId: number = 0;
      if (this.authService.isLoggedIn() && this.authService.getRole()=="ROLE_GUEST") {
        guestId = this.authService.getId();
      }
      this.reviewService.getReviewsForHost(this.hostId, guestId).subscribe({
        next: (host : HostPublicDataDTO) => {
          this.username = host.username;
          this.name = host.firstName + " " + host.lastName;
          this.reviews = host.reviews;
          this.isReviewable = host.isReviewable;
          console.log(this.isReviewable);
          this.imgPath = this.imageService.getPath(host.imageId, true);
        },
        error: () => {
          console.error("Error host with id: " + this.hostId);
        }
      })
    });
  }
}
