import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const passwordControl = control.get('newPassword');
  const confirmPasswordControl = control.get('repeatPassword');

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

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css', "../../../styles.css"]
})
export class ChangePasswordComponent {

  changePasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/)]],
      repeatPassword: ['', Validators.required]
    }, {validator: passwordMatchValidator});
  }



}
