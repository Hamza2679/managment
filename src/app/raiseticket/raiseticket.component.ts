import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from "rxjs";

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';





@Component({
    selector: 'app-raiseticket',
    templateUrl: './raiseticket.component.html',
    styleUrls: ['./raiseticket.component.css'],
    providers: [],
    standalone: true,
    imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        MatButtonModule,
        MatIconModule,
    ],
})


export class RaiseticketComponent {
  
  constructor(private builder:FormBuilder ,private service:AuthService, private router:Router,private toastr:ToastrService) {
    
	
    sessionStorage.clear();
  }

  result: any;

  ticketform = this.builder.group({
    name: this.builder.control('', Validators.required),
    subject: this.builder.control('', Validators.required),
    select: this.builder.control('', Validators.required),
    brief: this.builder.control('', Validators.required),
    file: this.builder.control('', Validators.required),
   // date: this.builder.control('', Validators.required),
    comment: this.builder.control('open')
  });

  raiseticket() {
    if (this.ticketform.valid) {
     this.service.postTicket(this.ticketform.value)
     .subscribe(res=>{
      console.log(res);
      this.router.navigate(['dashboard']);
      this.toastr.success("Ticket added successfully");
     }, err => {
      this.toastr.error("Error while raising ticket");
     })
} 
}
proceed(){
  this.router.navigate(['dashboard']);
}
}