import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginData = { email: '', password: '' };
  isAdmin:string = 'false';
  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
   this.isAdmin = this.route.snapshot.params['isAdmin'];
  }
  
  login() {
    // Send login request to the API
    const formData = new FormData();
    formData.append('email', this.loginData.email);
    formData.append('password', this.loginData.password);
    formData.append('isAdmin', this.route.snapshot.params['isAdmin']);
    this.http.post('http://172.20.127.201:8080/volunteer/checkVolunteer', formData).subscribe(
      (response) => {
        // Handle successful login
        console.log('Logged in successfully', response);
        if (response == true) {
          this.toastr.success("Logging in...")
          localStorage.setItem('email',this.loginData.email)
          if(this.route.snapshot.params['isAdmin']==='true'){
            this.router.navigate(['/admin']);
          }
          else{
            this.router.navigate(['/volunteer']);
          }
        }

        else
          this.toastr.error("Invalid user!")
        // Redirect or perform other actions
      },
      (error) => {
        // Handle login error
        console.error('Login failed', error);


      }
    );
  }
}
