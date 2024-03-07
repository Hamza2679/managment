import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { NgxOtpInputConfig } from 'ngx-otp-input/public-api';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
    standalone: true,
    imports: [MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink]
})
export class UserComponent {
  otpInputConfig:NgxOtpInputConfig={
    otpLength:6,
    autofocus:true,
    classList:{
      inputBox:'my-super-box-class',
      input:'my-super-class',
      inputFilled:'my-super-filled-class',
      inputDisabled:'my-super-disabled-class',
      inputSuccess:'my-super-success-class',
      inputError:'my-super-error-class'
    }
  }
  handleOtpChange(value:any):void {
    
  
  }
  handleFillEvent(value:any):void {
    console.log(value);

  }
  constructor(private builder:FormBuilder ,private service:AuthService, private router:Router,private toastr:ToastrService){
    sessionStorage.clear();
  }
  result: any;

  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetUserbyCode(this.loginform.value.id).subscribe(item => {
        this.result = item;
        if (this.result.password === this.loginform.value.password) {
          if (this.result.isactive) {
           
            sessionStorage.setItem('id',this.result.id);
            sessionStorage.setItem('role',this.result.role);
            this.router.navigate(['dashboard']);
          } else {
            this.toastr.success('Please contact Admin');
          }
        } else {
          this.toastr.error('Invalid role id');
        }
      });
    } else {
      alert('Please enter valid data.')
    }
  }
}
