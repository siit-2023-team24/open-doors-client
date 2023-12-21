import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule} from "@angular/router";
import { MaterialModule } from '../infrastucture/material/material.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile.edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { AccountActivationComponent } from './account-activation/account-activation.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileEditComponent,
    ChangePasswordComponent,
    AccountActivationComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileEditComponent,
    ChangePasswordComponent
  ]
})
export class UserManagementModule { }
