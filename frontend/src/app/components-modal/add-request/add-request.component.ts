import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Orders } from 'src/app/models/order';
import { Users } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import * as moment from 'moment';
@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.scss']
})
export class AddRequestComponent implements OnInit {
  order:Orders = new Orders();
  currentUser!:Users;
  constructor(
    public dialogRef: MatDialogRef<AddRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api:ApiService
  ) {}

  ngOnInit(): void {
    this.currentUser = Users.getCurrentUser();
    this.order.customer_id = this.currentUser.id;
  }
  
 //This code is saving the order data to the API and closing the dialog if the response is successful.
 save(){
    this.order.picked_date = moment(this.order.picked_date).format("YYYY-MM-DD");
    this.api.addRequest(this.order).subscribe(res=>{
      if(res.success){
        this.dialogRef.close({
          reload:true
        });
      }
     
    });
  }
}
