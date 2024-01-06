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
import { AccountActivationComponent } from './user-management/account-activation/account-activation.component';
import { AuthGuard } from './auth/guard';
import { PendingAccommodationsComponent } from './accommodation-management/pending-accommodations/pending-accommodations.component';
import { ReservationRequestGuestPageComponent } from './reservation-management/reservation-request-guest-page/reservation-request-guest-page.component';
import { FavoritesPageComponent } from './accommodation-management/favorites-page/favorites-page.component';

const routes: Routes = [
    {component: LoginComponent, path:"login"},
    {component: RegisterComponent, path:"register"},
    {component: HomePageComponent, path:"home"},
    {component: ProfileComponent, path:"profile", canActivate: [AuthGuard], data : {role: ['ROLE_ADMIN', 'ROLE_HOST', 'ROLE_GUEST']}},
    {component: ProfileEditComponent, path:"edit-profile", canActivate: [AuthGuard], data : {role: ['ROLE_ADMIN', 'ROLE_HOST', 'ROLE_GUEST']}},
    {component: ChangePasswordComponent, path:"edit-profile/change-password", canActivate: [AuthGuard], data : {role: ['ROLE_ADMIN', 'ROLE_HOST', 'ROLE_GUEST']}},
    {component: MyAccommodationsComponent, path:"my-accommodations", canActivate: [AuthGuard], data : {role: ['ROLE_HOST']}},
    {component: CreateAccommodationComponent, path:"create-accommodation/:id/:accommodationId", canActivate: [AuthGuard], data : {role: ['ROLE_HOST']}},
    {component: AccountActivationComponent, path:"activate-account"},
    {component: AccommodationPageComponent, path:"accommodation/:id/:accommodationId"},
    {component: PendingAccommodationsComponent, path: "pending-accommodations", canActivate: [AuthGuard], data : {role: ['ROLE_ADMIN']}},
    {component: ReservationRequestGuestPageComponent, path: "reservationRequests"},
    {component: FavoritesPageComponent, path:"favorites/:guestId"},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }