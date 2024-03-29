import { Component,OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-updatepopup',
    templateUrl: './updatepopup.component.html',
    styleUrls: ['./updatepopup.component.css'],
    standalone: true,
    imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatOptionModule, NgFor, MatCheckboxModule, MatButtonModule]
})
export class UpdatepopupComponent implements OnInit {
  constructor(private builder: FormBuilder, private service: AuthService, private toastr: ToastrService,
    private dialogref: MatDialogRef<UpdatepopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    this.service.getuserrole().subscribe(res => {
      this.rolelist = res;
    });
    
    

  }
  ngOnInit(): void {
    if (this.data.usercode != '' && this.data.usercode != null) {
      this.loaduserdata(this.data.usercode);
    }
  }
  rolelist: any;
  editdata: any;
  
  registerform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    password: this.builder.control(''),
    email: this.builder.control(''),
    gender: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
    //comment:this.builder.control('')
  });

  loaduserdata(code: any) {
    this.service.GetUserbyCode(code).subscribe(res => {
      this.editdata = res;
      console.log(this.editdata);
      this.registerform.setValue({
        id: this.editdata.id, name: this.editdata.name,
        password: this.editdata.password, email: this.editdata.email, gender: this.editdata.gender,
        role: this.editdata.role, isactive: this.editdata.isactive,
       // comment:this.editdata.comment
      });
    });
  }
  UpdateUser() {
    this.service.updateuser(this.registerform.value.name, this.registerform.value.isactive).subscribe(res => {
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    });
  }
}