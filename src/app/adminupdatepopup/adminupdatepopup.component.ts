import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-adminupdatepopup',
    templateUrl: './adminupdatepopup.component.html',
    styleUrls: ['./adminupdatepopup.component.css'],
    standalone: true,
    imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule, MatOptionModule, NgFor, MatInputModule, MatCheckboxModule, MatButtonModule]
})
export class AdminupdatepopupComponent implements OnInit{
  private role:String=''
  constructor(private builder: FormBuilder, private service: AuthService, private toastr: ToastrService,
    private dialogref: MatDialogRef<AdminupdatepopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

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
  
  
  ticketform = this.builder.group({
    id: this.builder.control(''),
    name: this.builder.control(''),
    select: this.builder.control(''),
    brief: this.builder.control(''),
    file: this.builder.control('male'),
    role: this.builder.control('', Validators.required),
    isactive: this.builder.control(false),
    comment:this.builder.control('')
  });

  loaduserdata(code: any) {
    this.service.GetTicketbyCode(code).subscribe(res => {
      this.editdata = res;
      console.log(this.editdata);
      this.ticketform.setValue({
        id: this.editdata.id, 
        name: this.editdata.name, 
        select: this.editdata.select,
         brief: this.editdata.brief,
        file: this.editdata.file,
        role: this.editdata.role,
         isactive: this.editdata.isactive,
        comment:this.editdata.comment
      });
    });
  }
  updateTicket() {
    this.service.updateTicket(this.ticketform.value.id,this.ticketform.value).subscribe(res => {
      this.ticketform.setValue({
        id: this.editdata.id, 
        name: this.editdata.name, 
        select: this.editdata.select,
         brief: this.editdata.brief,
        file: this.editdata.file,
        role: this.editdata.role,
         isactive: this.editdata.isactive,
        comment:this.editdata.comment
      });
      this.toastr.success('Updated successfully.');
      this.dialogref.close();
    });
  }
}
