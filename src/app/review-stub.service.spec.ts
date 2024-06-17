import { TestBed } from '@angular/core/testing';

import { ReviewStubService } from './review-stub.service';

describe('ReviewStubService', () => {
  let service: ReviewStubService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewStubService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
