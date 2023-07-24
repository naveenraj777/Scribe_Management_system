import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisteredExamsService {

  constructor(private httpclient:HttpClient) { }

  getExams():Observable<any>{
    const formData = new FormData();
    formData.append('email', localStorage.getItem('email')!);
    return this.httpclient.post<any>('http://172.20.127.201:8080/mapping/getRegExams',formData);
  }

  decline(data:any):Observable<any>{
    return this.httpclient.post<any>('http://172.20.127.201:8080/mapping/remMapping',{exam_id:data.exam_id,email:localStorage.getItem('email')})
  }

}
