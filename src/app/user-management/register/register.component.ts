import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';

const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('confirmPassword');

  if (passwordControl && confirmPasswordControl && passwordControl.value !== confirmPasswordControl.value) {
    if (confirmPasswordControl.errors) {
      confirmPasswordControl.setErrors({ ...confirmPasswordControl.errors, passwordMismatch: true });
    } else {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    }
    return { passwordMismatch: true };
  } else {
    if (confirmPasswordControl) {
      confirmPasswordControl.setErrors(null);
    }
    return null;
  }
};

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumberRegex = /^\d{10}$/;

    if (control.value && !phoneNumberRegex.test(control.value)) {
      return { invalidPhoneNumber: true };
    }
    return null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../styles.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      number: ['1', Validators.min(1)],
      phone: ['', [Validators.required, phoneNumberValidator()]],
    }, { validator: passwordMatchValidator });
  }
}
