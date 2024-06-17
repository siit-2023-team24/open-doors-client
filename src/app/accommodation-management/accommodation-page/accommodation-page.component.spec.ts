// import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccommodationPageComponent } from './accommodation-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccommodationService } from '../accommodation.service';
import { ImageService } from 'src/app/image-management/image.service';
import { ReviewService } from 'src/app/review-management/review.service';
import { ReservationRequestService } from '../reservation-request.service';
import { AuthService } from 'src/app/auth/auth.service';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { AccommodationStubServiceService } from 'src/app/accommodation-stub-service.service';
import { MapViewComponent } from '../map-view/map-view.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReviewStubService } from 'src/app/review-stub.service';
describe('AccommodationPageComponent', () => {
  let component: AccommodationPageComponent;
  let fixture: ComponentFixture<AccommodationPageComponent>;
  let reservationService: jasmine.SpyObj<ReservationRequestService>;

  beforeEach(waitForAsync(() => {
    const reservationServiceSpy = jasmine.createSpyObj('ReservationRequestService', ['makeReservation']);
    const accommodationServiceSpy = jasmine.createSpyObj('AccommodationService', ['getAccommodationWhenGuest', 'getAccommodation', 'getSeasonalRatesForAccommodation']);
    const imageServiceSpy = jasmine.createSpyObj('ImageService', ['getPath']);
    const reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['getReviewsForAccommodation']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getRole', 'getId']);
    
    TestBed.configureTestingModule({
      declarations: [AccommodationPageComponent, MapViewComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatSnackBarModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatButtonModule,
        MatGridListModule,
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule
      ],
      providers: [
        { provide: ReservationRequestService, useValue: reservationServiceSpy },
        { provide: AccommodationService, useValue: accommodationServiceSpy },
        { provide: ImageService, useValue: imageServiceSpy },
        { provide: ReviewService, useValue: reviewServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        {provide: AccommodationService, useClass: AccommodationStubServiceService},
        {provide: ReviewService, useClass: ReviewStubService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') return '1';
                  if (key === 'accommodationId') return '1';
                  return null;
                },
              },
            },
          },
        },
      ],
    })
   .compileComponents();
    fixture = TestBed.createComponent(AccommodationPageComponent);
    component = fixture.componentInstance;
    reservationService = TestBed.inject(ReservationRequestService) as jasmine.SpyObj<ReservationRequestService>;
    component.reviews = []
    fixture.detectChanges();
  }));
  
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the reservation button if the form is invalid', () => {
    component.selectedStartDate = new Date();
    component.selectedEndDate = new Date();
    component.selectedGuestNumber = 0;
    component.onInput();
    expect(component.isReservationButtonDisabled).toBeTruthy();

    component.selectedStartDate = new Date();
    component.selectedEndDate = new Date();
    component.selectedGuestNumber = component.accommodation.minGuests - 1;
    component.onInput();
    expect(component.isReservationButtonDisabled).toBeTruthy();
  });

  it('should enable the reservation button if the form is valid', () => {
    component.selectedStartDate = new Date();
    component.selectedEndDate = new Date();
    component.selectedGuestNumber = component.accommodation.minGuests;
    component.onInput();
    expect(component.isReservationButtonDisabled).toBeFalsy();
  });

  it('should make a reservation request with valid data', waitForAsync(() => {
    // Mocking the response from makeReservation to match MakeReservationRequestDTO
    // TODO: mozda mockovanje authServisa umesto accommodationId: 1
    reservationService.makeReservation.and.returnValue(of({
      accommodationId: 1,
      guestId: undefined,
      numberOfGuests: component.selectedGuestNumber,
      startDate: component.selectedStartDate,
      endDate: component.selectedEndDate,
      totalPrice: 0
    }));
  
    component.selectedStartDate = new Date();
    component.selectedEndDate = new Date();
    component.selectedGuestNumber = component.accommodation.minGuests;
    component.accommodation.id = 1;
    
    component.accommodation.totalPrice = 1000;
    component.isGuest = true;

    component.onInput();
    component.makeReservationRequest();
  
    expect(reservationService.makeReservation).toHaveBeenCalledTimes(1);
    expect(reservationService.makeReservation).toHaveBeenCalledWith({
      accommodationId: 1,
      guestId: undefined,
      numberOfGuests: component.selectedGuestNumber,
      startDate: component.selectedStartDate,
      endDate: component.selectedEndDate,
      totalPrice: 0
    });
  }));
  

  // it('should show an error message if the reservation request fails', waitForAsync(() => {
  //   const snackBarSpy = spyOn(component as any, 'showSnackBar');
  //   reservationService.makeReservation.and.returnValue(of({ error: 'Error making reservation request' }));

  //   component.selectedStartDate = new Date();
  //   component.selectedEndDate = new Date();
  //   component.selectedGuestNumber = component.accommodation.minGuests;
  //   component.accommodation.id = 1;
  //   component.accommodation.totalPrice = 1000;
  //   component.isGuest = true;

  //   component.onInput();
  //   component.makeReservationRequest();

  //   expect(reservationService.makeReservation).toHaveBeenCalledTimes(1);
  //   expect(snackBarSpy).toHaveBeenCalledWith('Error making reservation request. Please try again.');
  // }));
});
