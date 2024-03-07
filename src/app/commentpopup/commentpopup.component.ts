import { Component,OnInit,Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
    selector: 'app-commentpopup',
    templateUrl: './commentpopup.component.html',
    styleUrls: ['./commentpopup.component.css'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule]
})
export class CommentpopupComponent implements OnInit {
  public comment:any
  userlist:any
  name:any
  
   constructor(private builder: FormBuilder, private service: AuthService, private toastr: ToastrService,private dialogref: MatDialogRef<CommentpopupComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
 
     this.service.getTicket().subscribe(res => {
       this.userlist = res;
       this.userlist = this.userlist.filter((i:any)=>i.name == this.name)
       console.log(this.name)
       res.filter((i:any)=>{
         i.comment
         if (i.id == 4)
         {
           this.comment= i.comment
         }
       })
     });
   
   }
   ngOnInit():void{
 
   }
}
