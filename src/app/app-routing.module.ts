import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user-management/login/login.component';
import { RegisterComponent } from './user-management/register/register.component';
import { HomePageComponent } from './accommodation-management/home-page/home-page.component';
import { AccommodationPageComponent } from './accommodation-management/accommodation-page/accommodation-page.component';
import { ProfileComponent } from './user-management/profile/profile.component';
import { ProfileEditComponent } from './user-management/profile-edit/profile.edit.component';
import { ChangePasswordComponent } from './user-management/change-password/change-password.component';
import { MyAccommodationsComponent } from './accommodation-management/my-accommodations/my-accommodations.component';
import { CreateAccommodationComponent } from './accommodation-management/create-accommodation/create-accommodation.component';
import { PendingAccommodationsComponent } from './accommodation-management/pending-accommodations/pending-accommodations.component';

const routes: Routes = [
    {component: LoginComponent, path:"login"},
    {component: RegisterComponent, path:"register"},
    {component: HomePageComponent, path:"home"},
    {component: AccommodationPageComponent, path:"accommodation"},
    {component: ProfileComponent, path:"profile"},
    {component: ProfileEditComponent, path:"edit-profile"},
    {component: ChangePasswordComponent, path:"edit-profile/change-password"},
    {component: MyAccommodationsComponent, path:"my-accommodations"},
    {component: CreateAccommodationComponent, path:"create-accommodation/:id/:accommodationId"},
    {component: PendingAccommodationsComponent, path: "pending-accommodations"}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }