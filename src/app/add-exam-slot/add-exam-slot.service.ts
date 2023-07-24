import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AddExamSlotService {

  constructor(private httpclient:HttpClient,private datePipe: DatePipe) { }
  addSlot(data:any):Observable<any>{
    let formData = new FormData();
    console.log(data.controls);
    
    for (const controlName in data.controls) {

     console.log(data.get(controlName)?.value);
     if(controlName==='date'){
        console.log(this.formatDate(data.get('date').value));
        
        formData.append(controlName,this.formatDate(data.get('date').value));
        continue;
     }
     if(controlName==='starttime' || controlName==='endtime'){
      console.log(this.formatTime(data.get(controlName).value));
      formData.append(controlName,this.formatTime(data.get(controlName).value));
        continue;
     }
  
        // console.log(controlName)
      formData.append(controlName, data.get(controlName)?.value);
    }
    // formData.append('','')
    console.log(formData);      
    
    return this.httpclient.post<any>('http://172.20.127.201:8080/exam/addExam',formData);
  }

  // formatDate(date: Date): string {
  //   // Convert the Date to the desired format (e.g., 'YYYY-MM-DD')
  //   // You can use libraries like moment.js or date-fns for more complex formatting
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');

  //   return `${year}-${month}-${day}`;
  // }
  formatDate(date:Date):any{
    return  this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  formatTime(time12hr: string): string {
    const [time, modifier] = time12hr.split(' ');
    let [hours, minutes] = time.split(':');

    if (modifier === 'PM' && hours !== '12') {
      hours = String(Number(hours) + 12);
    }

    if (modifier === 'AM' && hours === '12') {
      hours = '00';
    }

    return `${hours}:${minutes}:00`;
  }

}
