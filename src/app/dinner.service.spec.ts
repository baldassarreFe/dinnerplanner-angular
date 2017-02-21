import { TestBed, inject } from '@angular/core/testing';
import { DinnerService } from './dinner.service';

describe('DinnerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DinnerService]
    });
  });

  it('should ...', inject([DinnerService], (service: DinnerService) => {
    expect(service).toBeTruthy();
  }));
});
