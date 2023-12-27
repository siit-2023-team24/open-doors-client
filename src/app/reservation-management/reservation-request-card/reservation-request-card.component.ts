import { Component, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/image-management/image.service';
import { ReservationRequestForGuestDTO } from '../model/reservation-request';

@Component({
  selector: 'app-reservation-request-card',
  templateUrl: './reservation-request-card.component.html',
  styleUrls: ['./reservation-request-card.component.css']
})
export class ReservationRequestCardComponent {
  constructor(private snackBar: MatSnackBar, private router: Router, private imageService: ImageService) {}
  
  @Input()
  request: ReservationRequestForGuestDTO;

  getImagePath(): string {
    return this.imageService.getPath(this.request.imageId, false);
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
