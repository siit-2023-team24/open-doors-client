import { Component } from '@angular/core';
import { UserReportDTO } from '../model/user-report';
import { UserReportService } from '../user-report.service';

@Component({
  selector: 'app-user-reports',
  templateUrl: './user-reports.component.html',
  styleUrls: ['./user-reports.component.css']
})
export class UserReportsComponent {

  reports: UserReportDTO[] = [];
  noDataMessage: string = "";

  constructor(private service: UserReportService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: UserReportDTO[]) => {
        this.reports = data;
        if (data.length == 0) 
          this.noDataMessage = "There are no user reports right now";

      },
      error: () => console.error("Error getting user reports")
    })
  }




  reloadParent(id: number): void {
    this.ngOnInit();
  }

}
