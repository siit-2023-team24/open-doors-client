import { Component, Input } from '@angular/core';
import { ReviewDetailsDTO } from '../model/review-details';
import { ImageService } from 'src/app/image-management/image.service';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent {
  @Input() review: ReviewDetailsDTO;

  imagePath: string = "";

  constructor(private imageService: ImageService) {}
  ngOnInit(): void {
    this.imagePath = this.imageService.getPath(this.review.authorId, true);
  }
}
