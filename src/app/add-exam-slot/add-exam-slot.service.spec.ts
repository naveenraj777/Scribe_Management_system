import { TestBed } from '@angular/core/testing';

import { AddExamSlotService } from './add-exam-slot.service';

describe('AddExamSlotService', () => {
  let service: AddExamSlotService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddExamSlotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
