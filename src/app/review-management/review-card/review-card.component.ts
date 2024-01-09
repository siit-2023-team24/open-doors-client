import { Component, Input } from '@angular/core';
import { ReviewDetailsDTO } from '../model/review-details';
import { ImageService } from 'src/app/image-management/image.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent {
  @Input() review: ReviewDetailsDTO;

  imagePath: string = "";
  guest: string = "";

  constructor(private imageService: ImageService,
              private authService: AuthService) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.guest = this.authService.getUsername();
    }
    this.imagePath = this.imageService.getPath(this.review.imageId, true);
  }
}
