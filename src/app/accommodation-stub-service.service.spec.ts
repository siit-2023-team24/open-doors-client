import { TestBed } from '@angular/core/testing';

import { AccommodationStubServiceService } from './accommodation-stub-service.service';

describe('AccommodationStubServiceService', () => {
  let service: AccommodationStubServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationStubServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
