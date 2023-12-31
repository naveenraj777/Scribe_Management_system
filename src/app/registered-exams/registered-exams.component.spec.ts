import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredExamsComponent } from './registered-exams.component';

describe('RegisteredExamsComponent', () => {
  let component: RegisteredExamsComponent;
  let fixture: ComponentFixture<RegisteredExamsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredExamsComponent]
    });
    fixture = TestBed.createComponent(RegisteredExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
