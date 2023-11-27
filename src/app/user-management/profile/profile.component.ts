import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "../model/user.model"
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = {
      email: "test@email.com",
      imageId: 1,
      firstName: "first",
      lastName: "last",
      country: "co",
      city: "city",
      address: "addr",
      phone: "5632842"
    }
  }



}
