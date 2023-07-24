import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddExamSlotService } from './add-exam-slot.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-exam-slot',
  templateUrl: './add-exam-slot.component.html',
  styleUrls: ['./add-exam-slot.component.css']
})
export class AddExamSlotComponent {
  
  myForm!: FormGroup;
  languages:string[] = ['English','Tamil','Hindi'];
  constructor(private formBuilder: FormBuilder,private addExamSlotService:AddExamSlotService,private toastr: ToastrService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.myForm = this.formBuilder.group({
      exam_id: ['', Validators.required],
      subject: ['', Validators.required],
      date: ['', Validators.required],
      starttime: ['', Validators.required],
      endtime: ['', Validators.required],
      language:['',Validators.required],
      wanted:[0,Validators.required],
      address:['',Validators.required],
      file:[null,Validators.required]      
    });

    // this.myForm = new FormGroup({
    //   name: new FormControl('',[Validators.required]),
    //   email: new FormControl('',[Validators.email]),
    //   message: new FormControl('',)
    // });
  }


  getFile(event:any){
    this.myForm.controls['file'].patchValue(event.target.files[0]);
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = this.myForm;
      console.log('Form submitted:', this.myForm);
      this.addExamSlotService.addSlot(formData).subscribe((res)=>{
        if(res){
          this.toastr.success("Exam slot successfully!");
          this.myForm.reset();
        }
      });
      

      // You can perform additional actions with the form data, like sending it to a backend server.
      // For this example, we're just logging the data to the console.
    } 
    // else {
    //   // If the form is not valid, you can mark the controls as touched to display validation errors.
    //   this.markFormGroupTouched(this.myForm);
    // }
  }
  // file_store!: FileList;
  // handleFileInputChange(l: FileList): void {
  //   this.file_store = l;
  //   if (l.length) {
  //     const f = l[0];
  //     const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
  //     this.myForm.controls['file'].patchValue(`${f.name}${count}`);
  //   } else {
  //     this.myForm.controls['file'].patchValue('');
  //   }
  // }
  // markFormGroupTouched(formGroup: FormGroup) {
  //   Object.values(formGroup.controls).forEach(control => {
  //     control.markAsTouched();
  //     if (control instanceof FormGroup) {
  //       this.markFormGroupTouched(control);
  //     }
  //   });
  // }
}

