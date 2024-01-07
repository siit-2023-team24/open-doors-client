import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewService } from '../review.service';
import { HostPublicDataDTO } from '../model/hostPublicData';
import { ImageService } from 'src/app/image-management/image.service';
import { ReviewDetailsDTO } from '../model/reviewDetails';

@Component({
  selector: 'app-host-reviews',
  templateUrl: './host-reviews.component.html',
  styleUrls: ['./host-reviews.component.css']
})
export class HostReviewsComponent implements OnInit {
  imgPath: string;
  username: string;
  name: string;
  reviews: ReviewDetailsDTO[]
  constructor(private route: ActivatedRoute, private reviewService: ReviewService, private imageService: ImageService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id: number = +params['hostId'];
      this.reviewService.getReviewsForHost(id).subscribe({
        next: (host : HostPublicDataDTO) => {
          this.username = host.username;
          this.name = host.firstName + " " + host.lastName;
          this.reviews = host.reviews;
          this.imgPath = this.imageService.getPath(host.imageId, true);
        },
        error: () => {
          console.error("Error host with id: " + id);
        }
      })
    });
  }
}
