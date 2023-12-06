import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

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
  accommodationForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.accommodationForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      confirmation: ['automatic', []],
      description: ['', Validators.maxLength(200)],
      selectedCountry: ['', Validators.required],
      city: ['', [Validators.required, Validators.maxLength(200)]],
      street: ['', [Validators.required, Validators.maxLength(200)]],
      number: ['1', [Validators.required, Validators.max(10000000), Validators.min(1)]],
      selectedType: ['', Validators.required],
      minNumber: ['1', [Validators.required, Validators.max(100), Validators.min(1)]],
      maxNumber: ['1', [Validators.required, Validators.max(100), Validators.min(1)]],
      deadline: ['0', [Validators.required, Validators.max(365), Validators.min(0)]]
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
}
