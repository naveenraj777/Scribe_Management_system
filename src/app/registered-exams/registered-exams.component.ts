import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RegisteredExamsService } from './registered-exams.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registered-exams',
  templateUrl: './registered-exams.component.html',
  styleUrls: ['./registered-exams.component.css'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class RegisteredExamsComponent implements OnInit{
  myExams:any;
  constructor(private registeredExamsService:RegisteredExamsService,private cdr:ChangeDetectorRef,private toastr: ToastrService){}
  ngOnInit(): void {
    this.registeredExamsService.getExams().subscribe((res)=>{
      this.myExams = res;
      console.log(this.myExams);
      
    })
  }

  onDecline(exam:any){
   
    
    this.registeredExamsService.decline(exam).subscribe();
    this.toastr.info("Exam Schedule declined!")
    this.cdr.detectChanges();
    
  }
  
}
