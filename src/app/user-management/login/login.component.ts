import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../model/account';
import { UserTokenState } from '../model/user-token-state.model';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/env/error-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../styles.css']
})
export class LoginComponent {
  loginForm : FormGroup;
  errorMessage : string = '';

  constructor(private formBuilder : FormBuilder, private userService: UserService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username : ['', [Validators.required, Validators.email] ],
      password : ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  login(): void {
    if(!this.loginForm.valid) {
      this.errorMessage = 'Please fill out both fields according to the validations.'
      return;
    }
    this.errorMessage = '';
    const account : Account = this.loginForm.value;

    this.userService.login(account).subscribe(
      (response: UserTokenState) => {
        localStorage.setItem('user', response.accessToken);
        this.router.navigate(['home'])
      },
      (error) => {
        console.error('Login error:', error);
        this.errorMessage = error.message;
      }
    );
  }
}
