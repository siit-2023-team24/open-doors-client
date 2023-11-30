import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "../model/user.model"
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/env/country';


@Component({
  selector: 'app-profile.edit',
  templateUrl: './profile.edit.component.html',
  styleUrls: ['./profile.edit.component.css', '../../../styles.css']
})
export class ProfileEditComponent {
  user: User;

  editProfileForm: FormGroup;

  countries: string[];

  constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder) {
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

    this.countries = Object.values(Country);

    this.editProfileForm = this.formBuilder.group({

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}\s?)?(\(\d{1,4}\)|\d{1,4})([-.\s]?\d{1,}){1,12}$/)]]
    });

    this.editProfileForm.patchValue(this.user);
  }

}
