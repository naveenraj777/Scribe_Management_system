import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExamSlotComponent } from './add-exam-slot.component';

describe('AddExamSlotComponent', () => {
  let component: AddExamSlotComponent;
  let fixture: ComponentFixture<AddExamSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddExamSlotComponent]
    });
    fixture = TestBed.createComponent(AddExamSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
