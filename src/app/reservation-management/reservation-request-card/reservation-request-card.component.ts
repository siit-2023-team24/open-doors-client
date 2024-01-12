import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImageService } from 'src/app/image-management/image.service';
import { ReservationRequestForGuestDTO } from '../model/reservation-request';
import { ReservationRequestService } from '../reservation-request.service';
import { ReservationRequestStatus } from '../model/reservation-request-status';

@Component({
  selector: 'app-reservation-request-card',
  templateUrl: './reservation-request-card.component.html',
  styleUrls: ['./reservation-request-card.component.css']
})
export class ReservationRequestCardComponent {
  constructor(private snackBar: MatSnackBar, 
    private router: Router, 
    private imageService: ImageService,
    private requestService: ReservationRequestService) {}
  
  @Input()
  request: ReservationRequestForGuestDTO;

  @Output()
  reload: EventEmitter<number> = new EventEmitter();

  getImagePath(): string {
    return this.imageService.getPath(this.request.imageId, false);
  }

  cancelRequest() {
    this.requestService.cancelRequest(this.request.id)
    .subscribe({
      next: () => {
        this.reload.emit(this.request.id);
        this.showSnackBar('Request cancelled successfully.');
      },
      error: (error) => {
        console.error('Error cancelling request:', error);
        this.showSnackBar(error.error.message);
      }
  });
  }

  deleteRequest() {
    this.requestService.deleteRequest(this.request.id)
    .subscribe({
      next: () => {
        this.reload.emit(this.request.id);
        this.showSnackBar('Request deleted successfully.');
      },
      error: (error) => {
        console.error('Error deleting request:', error);
        this.showSnackBar('Error deleting request.');
      }
    });
  }

  isRequestConfirmed() {
    return this.request.status === ReservationRequestStatus.CONFIRMED
    && new Date(this.request.startDate) > new Date();
  }

  isRequestPending() {
    return this.request.status === ReservationRequestStatus.PENDING;
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
