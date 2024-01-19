import { Component } from '@angular/core';
import { Notification } from '../model/notification';
import { NotificationService } from '../notification.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent {

  notifications: Notification[] = [];
  noData: string = "";

  constructor(private service: NotificationService,
              private authService: AuthService) {}

  ngOnInit(): void {
    const id: number = this.authService.getId();
    this.service.getAllFor(id).subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
        if (data.length == 0)
          this.noData = "You do not have any notifications yet.";
      },
      error: () => console.error('Error getting notifications')
    });
  }

}
