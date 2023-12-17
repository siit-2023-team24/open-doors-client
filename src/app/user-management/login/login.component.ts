import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Account } from '../model/account';
import { UserTokenState } from '../model/user-token-state.model';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

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
    this.userService.login(account).subscribe({
      next: (response: UserTokenState) => {
        localStorage.setItem('user', response.accessToken);
        // this.userService.setUser()
        this.router.navigate(['home'])
        
        //debugging
        const helper = new JwtHelperService();
        console.log(helper.decodeToken(response.accessToken));

      },
      error: (error: HttpErrorResponse) => {
        console.error('Login error:', error);
        this.errorMessage = 'Unrecognized username or password.';
      }
    })
  }
}
