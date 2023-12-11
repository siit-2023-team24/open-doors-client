import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { NewPasswordDTO } from '../model/newPasswordDTO';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


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

  constructor(private router: Router, private userService: UserService, private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {

    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,20}$/)]],
      repeatPassword: ['', Validators.required]
    }, {validator: passwordMatchValidator});
  }

  changePassword(): void {
    if (this.changePasswordForm.valid) {
      const dto: NewPasswordDTO = this.changePasswordForm.value;
      //autentication
      dto.email = "test@test.test";

      console.log(dto);

      this.userService.changePassword(dto).subscribe({
        next: () => {
          this.router.navigate(['profile'], {queryParams: {title: 'My profile'}});
          alert("You have successfully changed your password.");
        },
        error: () => { console.log("Error updating password");}
      })

    }
    else {
      alert("Input data is not valid.");
    }
  }

}
