import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../model/user.model"
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUserDTO } from '../model/editUserDTO';
import { Country } from 'src/env/country';


@Component({
  selector: 'app-profile.edit',
  templateUrl: './profile.edit.component.html',
  styleUrls: ['./profile.edit.component.css', '../../../styles.css']
})
export class ProfileEditComponent {
  user: User;
  userDto: EditUserDTO;

  editProfileForm: FormGroup;

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) {}

  countries: string[];


  
  ngOnInit(): void {

    //id from autentification
    const id = 1;
    this.userService.getUser(id).subscribe({
      
      next: (data: User) => {
        this.user = data;
        this.editProfileForm.patchValue(this.user);
      },
      error: (_) => { console.log('Error in getUser'); }
    });

    this.countries = Object.values(Country);

    this.editProfileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(\+\d{1,3}\s?)?(\(\d{1,4}\)|\d{1,4})([-.\s]?\d{1,}){1,12}$/)]]
    });

  }
  
  saveChanges(): void {
    if (this.editProfileForm.valid) {
      this.userDto = this.editProfileForm.value;
      this.userDto.image = this.user.image;
      this.userService.updateUser(this.userDto).subscribe(
        {
          next: () => {
            this.router.navigate(['profile'], {queryParams: {title: 'My profile'}});
          }
        }
      )

    }
  }

}
