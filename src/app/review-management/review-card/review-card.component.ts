import { Component, Input } from '@angular/core';
import { ReviewDetailsDTO } from '../model/review-details';
import { ImageService } from 'src/app/image-management/image.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ReviewService } from '../review.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.css']
})
export class ReviewCardComponent {
  @Input() review: ReviewDetailsDTO;
  @Input() isHost: boolean;
  @Input() canReport: boolean;

  imagePath: string = "";
  guest: string = "";

  constructor(private imageService: ImageService,
              private authService: AuthService,
              private dialog: MatDialog,
              private reviewService: ReviewService,
              private router: Router) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.guest = this.authService.getUsername();
    }
    this.imagePath = this.imageService.getPath(this.review.imageId, true);
  }

  openDialog(): void {
    console.log("I DID IT MOM")
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      question: "Are you sure you wish to delete your review?"
    }

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe({
      next: (answer: boolean) => {
        if (answer) this.onDelete();
      }
    })
  }

  refresh(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const currentUrl = this.router.url;

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  onDelete(): void {
    if(this.isHost) {
      this.reviewService.deleteHostReview(this.review.id).subscribe({
        next: () => {
          console.log('Deleted host review with id: ' + this.review.id);
          this.refresh();
        },
        error: (error) => {
          console.error(error.error.message);
          alert(error.error.message)
        }
      });
    }
    
  }

  changeReportedStatus(): void {
    this.reviewService.changeReportedStatus(this.review.id).subscribe({
      next: () => {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.refresh();
      },
      error: (error) => {
        
      }
    });
  }
}
