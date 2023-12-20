import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.css']
})
export class AccountActivationComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id: number = params['id'];
      if (id) {
        this.userService.activateUser(id).subscribe(
          next => {
            console.log("User successfully activated.");
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}