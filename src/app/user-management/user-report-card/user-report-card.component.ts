import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserReportDTO } from '../model/user-report';
import { UserReportService } from '../user-report.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-report-card',
  templateUrl: './user-report-card.component.html',
  styleUrls: ['./user-report-card.component.css']
})
export class UserReportCardComponent {
  
  @Input()
  report: UserReportDTO;
  
  @Output()
  reload: EventEmitter<number> = new EventEmitter();

  constructor(private service: UserReportService,
    private dialog: MatDialog, private snackBar: MatSnackBar) {}



  dialogDismiss(): void {}

  dialogBlock(): void {}



    

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
