import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    })
  }



}
