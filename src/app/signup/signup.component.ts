import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupData = { email: '', password: '',name:'',gender:'',mobile:'',address:'',english:'',tamil:'',hindi:''};
  constructor(private http: HttpClient,private toastr: ToastrService,private router:Router) {}
  sendData: any;
  signup() {
    this.sendData={email:this.signupData.email,name:this.signupData.name,password:this.signupData.password,gender:this.signupData.gender,mobile:this.signupData.mobile,address:this.signupData.address};
    this.sendData.lang=[]
    if(this.signupData.english)
      this.sendData.lang.push('English');
    if(this.signupData.tamil)
      this.sendData.lang.push('Tamil');
    if(this.signupData.hindi)
      this.sendData.lang.push('Hindi');
      console.log(this.sendData);
    this.http.post('http://172.20.127.201:8080/volunteer/insert',this.sendData).subscribe(
      (response) => {
        if (response == true) {
          this.toastr.success("Account created successfully")
          // localStorage.setItem('email',this.loginData.email)
          this.router.navigate(['/login/false']);
        }
        else{
          this.toastr.error("Please Try again!")
        }
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);
        
        // Display error message or perform other actions
      }
    );
  }
}
