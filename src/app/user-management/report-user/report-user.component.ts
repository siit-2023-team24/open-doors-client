import { Component, OnInit } from '@angular/core';
import { UserReportService } from '../user-report.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-report-user',
  templateUrl: './report-user.component.html',
  styleUrls: ['./report-user.component.css']
})
export class ReportUserComponent implements OnInit{

  usernames: string[]=[];
  isGuests: boolean;
  constructor(private userReportService: UserReportService,
              private authService: AuthService) {}

  ngOnInit(): void {
    this.isGuests = this.authService.getRole() == "ROLE_GUEST";
    this.userReportService.getReportableUsersForUser(this.authService.getId(), this.isGuests).subscribe({
      next: (usernames : string[]) => {
        this.usernames = usernames;
        console.log(usernames);
      },
      error: () => {
      }
    })
  }

}
