import { TestBed } from '@angular/core/testing';

import { RegisteredExamsService } from './registered-exams.service';

describe('RegisteredExamsService', () => {
  let service: RegisteredExamsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisteredExamsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
