import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "../model/user.model"
import { UserService } from '../user.service';
import { Country } from 'src/env/country';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../styles.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit(): void {
    this.user = {
      email: "test@email.com",
      role: 'guest',
      imageId: 1,
      firstName: "first",
      lastName: "last",
      country: Country.SAN_MARINO,
      city: "city",
      address: "addr",
      phone: "5632842"
    }
  }



}