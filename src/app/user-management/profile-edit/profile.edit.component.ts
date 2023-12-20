import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditUser } from '../model/edit-user.model';
import { Country } from 'src/env/country';
import { ImageService } from 'src/app/image-management/image.service';


@Component({
  selector: 'app-profile.edit',
  templateUrl: './profile.edit.component.html',
  styleUrls: ['./profile.edit.component.css', '../../../styles.css']
})
export class ProfileEditComponent {
  
  userDto: EditUser = {firstName: "", lastName: "", id: 0, country: Country.VATICAN_CITY, city: "", street: "", number: 0, phone: ""}
 
  imgPath: string = "";
  selectedImage: File;
  deletedImage: boolean = false;

  editProfileForm: FormGroup;
  countries: string[];

  constructor(private router: Router, private userService: UserService,
    private imageService: ImageService, private formBuilder: FormBuilder) {}

  
  ngOnInit(): void {

    //id from authentification
    const id = 1;
    this.userService.getUser(id).subscribe({
      
      next: (data: EditUser) => {
        this.userDto = data;
        this.editProfileForm.patchValue(this.userDto);
        this.imgPath = this.imageService.getPath(data.imageId, true);
      },
      error: (_) => { console.log('Error in getUser'); }
    });


    this.countries = Object.values(Country);

    this.editProfileForm = this.formBuilder.group({
      id : [id.toString(), []],
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
      
      console.log(this.userDto);

      const formData = new FormData();
      
      formData.append('id', this.userDto.id.toString());
      formData.append('firstName', this.userDto.firstName);
      formData.append('lastName', this.userDto.lastName);
      formData.append('country', this.userDto.country);
      formData.append('city', this.userDto.city);
      formData.append('street', this.userDto.street);
      formData.append('number', this.userDto.number.toString());
      formData.append('phone', this.userDto.phone);

      if (this.userDto.imageId)
        formData.append('imageId', this.userDto.imageId.toString());
      else
        formData.append('imageId', "");


      if (this.selectedImage) {
        formData.append('file', this.selectedImage);
      }

      this.userService.updateUser(formData).subscribe(
        { next: () => { this.router.navigate(['profile'], {queryParams: {title: 'My profile'}}); },
          error: () => { console.log("Error updating profile")} })
    }
  }


  deleteProfileImage(): void {
    this.userDto.imageId = undefined;
    this.imgPath = this.imageService.getPath(this.userDto.imageId, true);
    this.deletedImage = true;
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length) 
      this.selectedImage = inputElement.files[0];
    console.log(this.selectedImage);
  }

}
