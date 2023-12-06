import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AccommodationService } from '../accommodation.service';
import { Country } from 'src/env/country';
import { AccommodationWholeDTO } from '../model/accommodationWhole';
import { AccommodationType } from 'src/env/accommodationType';
import { Amenity } from 'src/env/amenity';

const minMaxValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const minControl = control.get('minNumber');
  const maxControl = control.get('maxNumber');

  if (minControl && maxControl && minControl.value > maxControl.value) {
    if (maxControl.errors) {
      maxControl.setErrors({ ...maxControl.errors, minMaxMismatch: true });
    } else {
      maxControl.setErrors({ minMaxMismatch: true });
    }
    return { minMaxMismatch: true };
  } else {
    if (maxControl) {
      maxControl.setErrors(null);
    }
    return null;
  }
};

@Component({
  selector: 'app-create-accommodation',
  templateUrl: './create-accommodation.component.html',
  styleUrls: ['./create-accommodation.component.css', '../../../styles.css']
})
export class CreateAccommodationComponent {

  countries = Object.values(Country);
  types = Object.values(AccommodationType);
  amenities = Object.values(Amenity) as Amenity[];

  selectedCountry: Country;
  selectedType: AccommodationType;
  accommodationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: AccommodationService) {
    
    this.accommodationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      isAutomatic: [true, []],
      description: ['', Validators.maxLength(200)],
      country: ['', Validators.required],
      city: ['', [Validators.required, Validators.maxLength(200)]],
      street: ['', [Validators.required, Validators.maxLength(200)]],
      number: ['1', [Validators.required, Validators.max(10000000), Validators.min(1)]],
      type: ['', Validators.required],
      minGuests: ['1', [Validators.required, Validators.max(100), Validators.min(1)]],
      maxGuests: ['1', [Validators.required, Validators.max(100), Validators.min(1)]],
      deadline: ['0', [Validators.required, Validators.max(365), Validators.min(0)]],
      
      id: 0,
      amenities: [],
      location: "",
      images: [],
      availability: [],
      price: 0,
      seasonalRates: []
    }, { validator : minMaxValidator });
  }

  selectedFiles: File[] = [];
  onFileChanged(event: any) {
      const files: FileList = event.target.files;
      if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
              this.selectedFiles.push(files[i]);
          }
      }
  }

  createAccommodation(): void {
    

    const accommodationDTO: AccommodationWholeDTO = this.accommodationForm.value;
    console.log(accommodationDTO);

    this.service.add(accommodationDTO).subscribe(
      (response) => {
        console.log("SUCCESS! " + accommodationDTO, response);
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }

  onNextClick(): void {
    if (this.accommodationForm.valid) {
      this.createAccommodation();
    } else {
      this.accommodationForm.markAllAsTouched();
    }
  }
}
