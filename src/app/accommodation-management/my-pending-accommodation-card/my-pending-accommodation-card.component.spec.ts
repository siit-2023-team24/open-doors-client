import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPendingAccommodationCardComponent } from './my-pending-accommodation-card.component';

describe('MyPendingAccommodationCardComponent', () => {
  let component: MyPendingAccommodationCardComponent;
  let fixture: ComponentFixture<MyPendingAccommodationCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyPendingAccommodationCardComponent]
    });
    fixture = TestBed.createComponent(MyPendingAccommodationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
