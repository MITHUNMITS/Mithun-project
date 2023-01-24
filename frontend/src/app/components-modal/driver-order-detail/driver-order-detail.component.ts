import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { EnumOrderStatus, Log, Orders } from 'src/app/models/order';
import { Users } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-driver-order-detail',
  templateUrl: './driver-order-detail.component.html',
  styleUrls: ['./driver-order-detail.component.scss']
})
export class DriverOrderDetailComponent implements OnInit {

  order!:Orders;
  currentUser!:Users;
  order_id:number=0;
  statuslist=[
    {name:"Request Accepted",value:EnumOrderStatus.Accepted},
    {name:"Ready for PickUp",value:EnumOrderStatus.Ready},
    {name:"Parcel Picked",value:EnumOrderStatus.pickedup},
    {name:"Way to delivery",value:EnumOrderStatus.deliveryway},
    {name:"Deliverd",value:EnumOrderStatus.closed},
  ];
  constructor(
    public dialogRef: MatDialogRef<DriverOrderDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public api:ApiService
  ) {}

  ngOnInit(): void {
    if(this.data && this.data.id){
      this.order_id = this.data.id;
    }
    this.currentUser = Users.getCurrentUser();
    this.loadDetails();
  }
//This code is making an API call to load details of an order with a given ID, and assigning the response data to the "order" variable.
  loadDetails(){
    this.api.loadDetails({id:this.order_id}).subscribe(res=>{
      if(res.success){
        this.order = res.data;
      }
     
    });
  }
  
//Formatting the picked and delivery dates and updating the order details to the API, closing the dialog if successful.
  save(status:number){
    this.order.picked_date = moment(this.order.picked_date).format("YYYY-MM-DD");
    this.order.delivery_date = moment(this.order.delivery_date).format("YYYY-MM-DD");
    this.setStatus(status);
    this.api.updateDetails(this.order).subscribe(res=>{
      if(res.success){
        this.dialogRef.close({
          reload:true
        });
      } else {
        this.api.showErrorSnackBar(res.data.message);
      }
     
    });
  }
//This code is setting the driver id, driver name, and order status name based on the status number and order status enum.
  setStatus(status:number){
    this.order.driver_id = this.currentUser.id;
    this.order.driver_name = this.currentUser.name;
    if(status==1){
      if(this.order.order_status==EnumOrderStatus.created){
        this.order.order_status=EnumOrderStatus.Accepted;
        this.order.status_name = "Request Accepted";
      } else if(this.order.order_status==EnumOrderStatus.Ready){
        this.order.status_name = "Ready for PickUp";
      } else if(this.order.order_status==EnumOrderStatus.pickedup){
        this.order.status_name = "Parcel Picked";
      } else if(this.order.order_status==EnumOrderStatus.deliveryway){
        this.order.status_name = "Way to delivery";
      } else if(this.order.order_status==EnumOrderStatus.closed){
        this.order.status_name = "Deliverd";
      }
     
    } else if(status==0){
      if(this.order.order_status==EnumOrderStatus.closed){
        this.order.status_name = "Cancelled";
      }
     
    }
  }
//This code formats a given date string into DD MMM YYYY format, or returns " - " if no date is given.
  formatDate(date:string){
    if(!date){
      return " - ";
    }
    return moment(date,"YYYY-MM-DD").format("DD MMM YYYY");
  }
//This code formats a given date string into a specific format (DD MMM YYYY hh:mm A) using the moment library.
  formatDateTime(date:string){
    if(!date){
      return " - ";
    }
    return moment(date,"YYYY-MM-DD").format("DD MMM YYYY hh:mm A");
  }

//This code adds a new Log object to the logs array of the order object.
  addLogs(){
    let log = new Log();
    this.order.logs.push(log);
  }
}
