import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from "../model/user.model"
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUserDTO } from '../model/editUserDTO';
import { Country } from 'src/env/country';
import { ImageService } from 'src/app/image-management/image.service';


@Component({
  selector: 'app-profile.edit',
  templateUrl: './profile.edit.component.html',
  styleUrls: ['./profile.edit.component.css', '../../../styles.css']
})
export class ProfileEditComponent {
  user: User;
  userDto: EditUserDTO;

  imgPath: string = "";
  selectedImage: File;

  editProfileForm: FormGroup;
  countries: string[];

  constructor(private router: Router, private userService: UserService,
    private imageService: ImageService, private formBuilder: FormBuilder) {}

  
  ngOnInit(): void {

    //id from autentification
    const id = 1;
    this.userService.getUser(id).subscribe({
      
      next: (data: User) => {
        this.user = data;
        this.editProfileForm.patchValue(this.user);
        this.imgPath = this.imageService.getPath(data.image);
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

      if (this.selectedImage) {
        const formData = new FormData();
        formData.append('file', this.selectedImage);

        this.imageService.uploadImage(formData, true, this.user.id).subscribe({
          next: (newImageId: number) => { 
            this.userDto.image = newImageId;
            console.log("new image uploaded  " + newImageId);

            this.userService.updateUser(this.userDto).subscribe(
              { next: () => { this.router.navigate(['profile'], {queryParams: {title: 'My profile'}}); } })
              
          },
          error: () => {console.log("error uploading image")}
        });
      }

      else {
        this.userService.updateUser(this.userDto).subscribe(
          { next: () => { this.router.navigate(['profile'], {queryParams: {title: 'My profile'}}); } })
      }
    }
  }


  deleteProfileImage(): void {
    this.imageService.deleteImage(this.user.image);
    this.user.image = this.imageService.defaultProfileImageId;
    this.imgPath = this.imageService.getPath(this.user.image);
  }

  onFileSelected(event: any): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) 
      this.selectedImage = inputElement.files[0];
    console.log(this.selectedImage);
  }

}
