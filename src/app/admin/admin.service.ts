import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpclient:HttpClient) { }
  getExams():Observable<any>{
  
    return this.httpclient.get<any>('http://172.20.127.201:8080/exam/getAllExams');
  }
  getAllReg(exam_id:string):Observable<any>{
    const formData = new FormData();
    formData.append('exam_id', exam_id);
    return this.httpclient.post<any>('http://172.20.127.201:8080/mapping/getAllReg',formData);
  }
}
