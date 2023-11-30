import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from "../model/user.model"
import { UserService } from '../user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile.edit',
  templateUrl: './profile.edit.component.html',
  styleUrls: ['./profile.edit.component.css', '../../../styles.css']
})
export class ProfileEditComponent {
  user: User;

  editProfileForm: FormGroup;

  constructor(private route: ActivatedRoute, private userService: UserService, private formBuilder: FormBuilder) {
  }

  
  ngOnInit(): void {

    //id from autentification
    const id = 1;
    this.userService.getUser(id).subscribe({
      
      next: (data: User) => {
        this.user = data;
      },

      error: (_) => { console.log('Error in getUser'); }
      
    });

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
  
  ngDoCheck(): void {
    this.editProfileForm.patchValue(this.user);
  }

}
